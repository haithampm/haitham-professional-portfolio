import { isAdminRequest } from "../../_utils";

export async function GET(request: Request) {
  const email = request.headers.get("oai-authenticated-user-email") ?? null;

  return Response.json({
    isAdmin: isAdminRequest(request),
    email,
  });
}
