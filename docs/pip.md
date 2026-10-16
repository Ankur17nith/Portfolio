# Pip AI Guide

Pip calls the server-only `/api/buddy` route. It uses the Google Gemini API with
`gemini-2.5-flash`, streamed text, and a 1,200-token output cap.
No API credentials are included in client bundles.
With visit memory enabled, recent redacted questions and short answers expire after 30 days.

Context contains Ankur Gupta's public profile, education, projects (FATGS, TT_TRACKER, PRISMS), skills and public portfolio notes.
The current work story is included in full; homepage requests include the
visible project and section. Page source is assembled on the server,
not accepted as trusted instructions from the browser. Replies use simple copy
and remove em dashes before display.

## Configuration

- `GEMINI_API_KEY`: Set your Google Gemini API key in the environment.
  Missing or placeholder credentials intentionally use the local site-answer fallback.
- `GEMINI_MODEL`: Defaults to `gemini-2.5-flash`.
- `MONGODB_URI` and `MONGODB_DATABASE`: Project database settings for rate limits and visitor persistence.
- `PIP_DAILY_LIMIT`: Shared daily request cap, default 500. Per-visitor cap is
  30 requests/hour. MongoDB atomic counters share limits across instances, use
  hashed IP identifiers, and expire after two days. Rate limiting fails closed.
- `PIP_IDENTITY_SECRET`: Server-only secret for signed visitor cookies and IP hashing.

After changing environment variables, redeploy for them to take effect.
The backend creates a TTL index on `buddy_rate_limits` when AI is first enabled.
Requests have a 16 KB body limit, a 600-character question limit, a 22-second
upstream deadline, and no automatic paid retries. Missing keys, provider errors,
rate limits, network errors and interrupted streams return a labelled local answer.
