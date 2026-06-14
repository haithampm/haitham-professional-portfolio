export const ADMIN_EMAILS = new Set([
  "haitham.pm@gmail.com",
  "haitham.pm@hotmail.com",
]);

export function isAdminRequest(request: Request) {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
    return true;
  }

  const email = request.headers
    .get("oai-authenticated-user-email")
    ?.trim()
    .toLowerCase();

  return Boolean(email && ADMIN_EMAILS.has(email));
}

export function unauthorized() {
  return Response.json(
    { error: "Admin access is restricted to the portfolio owner." },
    { status: 403 }
  );
}

export function routeErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const detail =
    error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : "";
  const combined = `${message}\n${detail}`;

  if (combined.includes("no such table")) {
    return "The database tables are not ready yet. Generate migrations and redeploy the site.";
  }

  if (combined.includes("D1 binding `DB` is unavailable")) {
    return "The D1 database binding is unavailable for this environment.";
  }

  return message;
}
