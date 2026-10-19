// Marks the static (GitHub Pages) build: no admin, no /api calls.
(globalThis as { __STATIC_SITE__?: boolean }).__STATIC_SITE__ = true;
export {};
