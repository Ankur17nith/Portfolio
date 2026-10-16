const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Load the actual TS modules with an isolated module cache and fake external services.
function loadModules({ events = [], upstreamError = false, limited = false } = {}) {
  const cache = new Map();
  const calls = [];

  global.fetch = async (url, options) => {
    calls.push({ url: String(url), options, body: options?.body ? JSON.parse(options.body) : null });
    if (upstreamError) {
      return new Response('upstream error', { status: 500 });
    }
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        for (const chunk of events) {
          controller.enqueue(enc.encode(`data: {"candidates":[{"content":{"parts":[{"text":${JSON.stringify(chunk)}}]}}]}\n\n`));
        }
        controller.close();
      }
    });
    return new Response(stream, { status: 200, headers: { 'content-type': 'text/event-stream' } });
  };

  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const loadedModule = { exports: {} }; cache.set(file, loadedModule);
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
    const localRequire = (id) => {
      if (id === '@/lib/testimonials') return { getApprovedTestimonials: async () => [{ id: 'public-1', name: 'Academic Collaborator', role: 'Student', company: 'NIT Hamirpur', testimonial: 'Ankur is dependable and focused on clean software architecture.' }] };
      if (id === '@/lib/pip-memory') return { loadVisitorMemory: async () => null, rememberQuestion: async () => {} };
      if (id === '@/lib/buddy-limit') return { limitBuddyRequests: async () => { if (limited) { const { BuddyRequestError } = load(path.resolve('src/lib/buddy-request.ts')); throw new BuddyRequestError('Chat limit reached.', 429); } } };
      if (id.startsWith('@/') || id.startsWith('.')) {
        const target = id.startsWith('@/') ? path.resolve('src', id.slice(2)) : path.resolve(path.dirname(file), id);
        if (target.endsWith('.json')) return JSON.parse(fs.readFileSync(target, 'utf8'));
        return load(target + '.ts');
      }
      return require(id);
    };
    new Function('require', 'module', 'exports', source)(localRequire, loadedModule, loadedModule.exports);
    return loadedModule.exports;
  }
  return { load: (file) => load(path.resolve(file)), calls };
}

function request(body, headers = {}) {
  return new Request('https://portfolio.test/api/buddy', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body)
  });
}

const question = { question: 'Tell me about FATGS scheduling logic', path: '/', history: [] };

test('validates bounded JSON, same-origin and questions', async () => {
  const { readBuddyRequest } = loadModules().load('src/lib/buddy-request.ts');
  await assert.rejects(readBuddyRequest(request(question, { origin: 'https://elsewhere.test' })), { status: 403 });
  await assert.rejects(readBuddyRequest(request({ question: '' })), { status: 400 });
  await assert.rejects(readBuddyRequest(request({ question: 'x'.repeat(601) })), { status: 400 });
  await assert.rejects(readBuddyRequest(request({ question: 'x', extra: 'x'.repeat(17000) })), { status: 413 });
  const parsed = await readBuddyRequest(request({ ...question, path: '//evil.test', history: [{ question: 'a', text: 'b' }, null] }));
  assert.equal(parsed.path, '/'); assert.equal(parsed.history.length, 1);
});

test('context is conditional and only includes trusted public sources', () => {
  const { buildBuddyContext } = loadModules().load('src/lib/buddy-context.ts');
  const storyContext = JSON.parse(buildBuddyContext('/work/fatgs', 'The academic scheduling problem.', '', 'Explain this'));
  assert.equal(storyContext.currentPage.story.slug, 'fatgs');
  assert.ok(storyContext.currentPage.story.outline.length >= 1);
  const home = JSON.parse(buildBuddyContext('/', 'Projects', 'fatgs', 'hello'));
  assert.equal(home.currentPage.project, 'FATGS');
  assert.equal(home.currentPage.story, undefined);
  assert.equal(home.projects.length, 3);
});

test('placeholder key returns an honest local fallback without API calls', async () => {
  process.env.GEMINI_API_KEY = 'your_gemini_api_key';
  const { load, calls } = loadModules();
  const response = await load('src/app/api/buddy/route.ts').POST(request(question));
  const result = await response.json();
  assert.equal(result.mode, 'local');
  assert.match(result.notice, /isn’t connected/);
  assert.equal(calls.length, 0);
});

test('streams Gemini output without em dashes and sends bounded history', async () => {
  process.env.GEMINI_API_KEY = 'valid-test-key-for-gemini-123456';
  const { load, calls } = loadModules({ events: ['Hi\u2014there'] });
  const response = await load('src/app/api/buddy/route.ts').POST(request({ ...question, history: [{ question: 'Previous question', text: 'Previous answer' }] }));
  const events = (await response.text()).trim().split('\n').map(JSON.parse);
  assert.equal(events[1].text, 'Hi, there');
  assert.equal(events.at(-1).type, 'done');
  assert.ok(calls[0].url.includes('streamGenerateContent'));
  assert.equal(calls[0].body.contents.length, 5);
});

test('provider failure falls back and does not disclose provider errors', async () => {
  process.env.GEMINI_API_KEY = 'valid-test-key-for-gemini-123456';
  const { load } = loadModules({ upstreamError: true });
  const result = await (await load('src/app/api/buddy/route.ts').POST(request(question))).json();
  assert.equal(result.mode, 'local');
  assert.ok(result.text);
  assert.doesNotMatch(JSON.stringify(result), /valid-test-key|upstream/);
});

test('interrupted stream delivers replacement local answer', async () => {
  process.env.GEMINI_API_KEY = 'valid-test-key-for-gemini-123456';
  const { load } = loadModules({ events: [] });
  const events = (await (await load('src/app/api/buddy/route.ts').POST(request(question))).text()).trim().split('\n').map(JSON.parse);
  assert.equal(events.at(-1).type, 'fallback');
  assert.ok(events.at(-1).text);
});

test('rate limited requests return 429 and fallback', async () => {
  process.env.GEMINI_API_KEY = 'valid-test-key-for-gemini-123456';
  const { load, calls } = loadModules({ limited: true });
  const response = await load('src/app/api/buddy/route.ts').POST(request(question));
  assert.equal(response.status, 429);
  assert.equal(calls.length, 0);
  assert.equal((await response.json()).mode, 'local');
});

test('activity validation rejects unsafe keys, bounds times and filters event kinds', () => {
  const { sanitizeSnapshot } = loadModules().load('src/lib/pip-behavior.ts');
  const id = '12345678-1234-1234-1234-123456789012';
  assert.equal(sanitizeSnapshot({ session: 'bad', pageId: id, path: '/' }), null);
  const result = sanitizeSnapshot({ session: id, pageId: id, path: '/', activeSeconds: 1e10, progress: 1000, sections: { 'bad.key': 10, work: 15, constructor: 55 }, events: [{ at: Date.now(), kind: 'password', target: 'secret' }, { at: Date.now(), kind: 'project', target: 'fatgs' }] });
  assert.equal(result.activeSeconds, 14400);
  assert.equal(result.progress, 100);
  assert.deepEqual(result.sections, { work: 15 });
  assert.equal(result.events.length, 1);
});

test('funnel represents actual actions and redacts obvious secrets', () => {
  const { funnelStage, redactQuestion } = loadModules().load('src/lib/pip-behavior.ts');
  assert.equal(funnelStage([{ path: '/', activeSeconds: 15, events: [{ kind: 'project', target: 'fatgs' }] }]), 'viewing_work');
  assert.equal(funnelStage([{ path: '/', activeSeconds: 15, events: [{ kind: 'contact', target: 'contact' }] }]), 'contact_clicked');
  assert.equal(funnelStage([{ path: '/work/fatgs', activeSeconds: 25, events: [] }]), 'exploring_details');
  assert.doesNotMatch(redactQuestion('My key sk-test123 and email person@example.com'), /sk-test|person@example/);
});

test('signed visitor cookies cannot be forged or borrowed from an arbitrary id', () => {
  const { visitorIdentity } = loadModules().load('src/lib/pip-memory.ts');
  const fresh = visitorIdentity(new Request('https://portfolio.test/'), true);
  const valid = visitorIdentity(new Request('https://portfolio.test/', { headers: { cookie: fresh.cookie.split(';')[0] } }));
  assert.equal(valid.id, fresh.id);
  assert.match(fresh.cookie, /HttpOnly/);
  assert.match(fresh.cookie, /Secure/);
  const forged = fresh.cookie.split(';')[0].replace(/.$/, (c) => c === 'a' ? 'b' : 'a');
  assert.equal(visitorIdentity(new Request('https://portfolio.test/', { headers: { cookie: forged } })), null);
});

test('local reactions are immediate, bounded, and independent of AI quotas', () => {
  const { createReactionGate, reactionFor } = loadModules().load('src/lib/pip-reactions.ts');
  const gate = createReactionGate();
  assert.equal(gate.allow('fatgs', 0), true);
  assert.equal(gate.allow('work', 1000), false);
  assert.equal(gate.allow('details', 1500, true), true);
  assert.equal(gate.allow('fatgs', 8000), false);
  for (let i = 0; i < 12; i++) assert.equal(gate.allow(`section-${i}`, 15000 + i * 13000), true);
  gate.dismiss(180000);
  assert.equal(gate.allow('resume', 181000, true), false);
  assert.equal(gate.allow('resume', 201000, true), true);
  assert.match(reactionFor('fatgs').text, /scheduling/);
  assert.equal(reactionFor('details').mode, 'reaction');
  assert.equal(reactionFor('unknown'), null);
});

test('responsive decks expose tall card footers before pinning and animate within the viewport', () => {
  const { deckPinTop, deckProgress } = loadModules().load('src/lib/project-deck.ts');
  assert.equal(deckPinTop(900, 610, 0), 88);
  assert.equal(deckPinTop(900, 610, 2), 116);
  for (const [viewport, card] of [[844, 1100], [600, 950], [1024, 1100]]) {
    const top = deckPinTop(viewport, card, 0);
    assert.equal(top + card, viewport - 24);
    assert.ok(top < 0);
    assert.equal(deckProgress(viewport, viewport, top), 0);
    assert.ok(deckProgress(viewport, viewport * .4, top) > 0);
    assert.equal(deckProgress(viewport, 88, top), 1);
    assert.equal(deckProgress(viewport, -1000, top), 1);
  }
});

test('work stories have distinct real media and evidence-aware context', () => {
  const { load } = loadModules();
  const { workMedia } = load('src/lib/work-media.ts');
  for (const images of Object.values(workMedia)) {
    assert.ok(images.length >= 1);
    assert.equal(new Set(images.map(image => image.src)).size, images.length);
    for (const image of images) assert.ok(fs.existsSync(path.join('public', image.src)));
  }
  const { buildBuddyContext } = load('src/lib/buddy-context.ts');
  const context = JSON.parse(buildBuddyContext('/', 'projects', 'fatgs', 'What is FATGS?'));
  assert.deepEqual(context.workExperience.map(item => item.name), ['FATGS', 'TT_TRACKER', 'PRISMS']);
  const { reactionFor } = load('src/lib/pip-reactions.ts');
  assert.match(reactionFor('story:fatgs:constraints').text, /Preventing faculty overlap/);
});

test('offline answer from approved public records is delivered', async () => {
  process.env.GEMINI_API_KEY = 'your_gemini_api_key';
  const { load } = loadModules();
  const result = await (await load('src/app/api/buddy/route.ts').POST(request({ question: 'What projects has Ankur worked on?', path: '/' }))).json();
  assert.equal(result.mode, 'local');
  assert.ok(result.text.length > 0);
});
