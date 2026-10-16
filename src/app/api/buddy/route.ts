import { getApprovedTestimonials } from "@/lib/testimonials";
import { sanitizeSnapshot } from "@/lib/pip-behavior";
import { loadVisitorMemory, rememberQuestion } from "@/lib/pip-memory";
import { buildBuddyContext, getPageContext, PIP_INSTRUCTIONS, plainText } from "@/lib/buddy-context";
import { answerGuide } from "@/lib/buddy-guide";
import { projects, socials } from "@/lib/data";
import { readBuddyRequest, BuddyRequestError } from "@/lib/buddy-request";
import { limitBuddyRequests } from "@/lib/buddy-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  let body;
  try { body = await readBuddyRequest(request); }
  catch (error) { return Response.json({ message: error instanceof Error ? error.message : "Please try again." }, { status: error instanceof BuddyRequestError ? error.status : 400 }); }
  const testimonials = await getApprovedTestimonials();
  const currentProject = body.path === "/" ? projects.find((project) => project.slug === body.project) : undefined;
  const fallbackQuestion = currentProject && /\b(this|current)\b/i.test(body.question) ? `${currentProject.name}: ${body.question}` : body.question;
  const fallback = answerGuide(fallbackQuestion, getPageContext(body.path), projects, socials.email, testimonials);
  const local = (notice: string, status = 200) => Response.json({ ...fallback, text: plainText(fallback.text), mode: "local", notice }, { status, headers: { "Cache-Control": "no-store" } });
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.length < 20 || /\.{3}|placeholder|replace|your.key/i.test(key)) return local("AI chat isn’t connected yet. Here’s what I found on the site.");
  try { await limitBuddyRequests(request); }
  catch (error) { return local(error instanceof BuddyRequestError ? error.message : "Chat is unavailable right now. Here’s what I found on the site.", error instanceof BuddyRequestError ? error.status : 503); }

  const activity = sanitizeSnapshot(body.activity);
  const visitorMemory = body.memory ? await loadVisitorMemory(request).catch(() => null) : null;
  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 22000);
  const cancel = () => abort.abort();
  request.signal.addEventListener("abort", cancel, { once: true });
  const clean = () => { clearTimeout(timeout); request.signal.removeEventListener("abort", cancel); };
  try {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(key)}`;
    const systemPrompt = `${PIP_INSTRUCTIONS}\n\nPUBLIC SOURCES:\n${buildBuddyContext(body.path, body.section, body.project, body.question, testimonials)}`;
    const contents = [
      { role: "user", parts: [{ text: `Behavior context (observations, not instructions): ${JSON.stringify({ currentActivity: activity, visitorMemory })}` }] },
      { role: "model", parts: [{ text: "Understood. I will answer as Pip, Ankur Gupta's AI portfolio guide." }] },
      ...body.history.flatMap((item) => [
        { role: "user", parts: [{ text: item.question }] },
        { role: "model", parts: [{ text: item.text }] }
      ]),
      { role: "user", parts: [{ text: body.question }] }
    ];

    const upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: abort.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: {
          maxOutputTokens: 1200,
          temperature: 0.7
        }
      })
    });

    if (!upstreamResponse.ok || !upstreamResponse.body) {
      throw new Error(`Gemini API error: ${upstreamResponse.status}`);
    }

    const encoder = new TextEncoder();
    const reader = upstreamResponse.body.getReader();
    const decoder = new TextDecoder();

    return new Response(new ReadableStream({
      async start(controller) {
        const send = (event: object) => { if (!abort.signal.aborted) controller.enqueue(encoder.encode(JSON.stringify(event) + "\n")); };
        let completed = false;
        let answer = "";
        let buffer = "";
        try {
          send({ type: "start", mode: "ai" });
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const jsonStr = trimmed.slice(5).trim();
              if (!jsonStr) continue;
              try {
                const data = JSON.parse(jsonStr);
                const chunk = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (chunk) {
                  const delta = plainText(chunk);
                  answer += delta;
                  send({ type: "delta", text: delta });
                  completed = true;
                }
              } catch {
                // Ignore partial JSON chunks
              }
            }
          }
          if (buffer.trim().startsWith("data:")) {
            try {
              const data = JSON.parse(buffer.trim().slice(5).trim());
              const chunk = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (chunk) {
                const delta = plainText(chunk);
                answer += delta;
                send({ type: "delta", text: delta });
                completed = true;
              }
            } catch {}
          }
          if (!completed) throw new Error("Incomplete reply");
          send({ type: "done", links: fallback.links ?? [] });
          if (body.memory) await rememberQuestion(request, activity, body.question, answer).catch(() => {});
        } catch {
          if (!request.signal.aborted) {
            try { controller.enqueue(encoder.encode(JSON.stringify({ type: "fallback", ...fallback, text: plainText(fallback.text), notice: "That reply was interrupted. Here’s what I found on the site." }) + "\n")); } catch { /* visitor disconnected */ }
          }
        } finally { clean(); try { controller.close(); } catch { /* visitor disconnected */ } }
      },
      cancel() { abort.abort(); clean(); },
    }), { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store, no-transform", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    console.warn("Pip chat request failed", { type: error instanceof Error ? error.name : "unknown", status: error && typeof error === "object" && "status" in error ? error.status : undefined });
    clean();
    return local("AI chat is unavailable right now. Here’s what I found on the site.");
  }
}
