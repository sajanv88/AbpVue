import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authSessions = getCookie(event, "auth_session");
  if(!authSessions) {
    throw new Error("Unauthorized: Please login.");
  }
  const auth = JSON.parse(authSessions);

  if (!auth.tokenSet) {
    setResponseStatus(event, 401, "Unauthorized");
    return {
      status: 401,
      message: "Unauthorized: Please login.",
    };
  }
  const path = event.path.replace("/api/abpServiceProxy", "");
  const targetUrl = joinURL(config.abpApiEndpoint, path);
  console.log(`Proxying request to ${targetUrl}, method: ${event.method}`);

  const verificationToken = getCookie(event, "XSRF-TOKEN");
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${auth.tokenSet.access_token}`);
  if (verificationToken) {
    headers.set("RequestVerificationToken", verificationToken);
  }

  if (event.method == "DELETE") {
    headers.delete("Content-Length");
  }

  headers.set("Content-Type", "application/json");
  headers.set("X-Requested-With", "XMLHttpRequest");

  const body = ["POST", "PUT"].includes(event.method)
    ? await readBody(event)
    : undefined;

  const response = await fetch(targetUrl, {
    method: event.method,
    headers: headers,
    credentials: "include",
    ...(body && { body: JSON.stringify(body) }),
  });

  console.log(response.status, response.statusText, "response");
  if (response.status === 204) {
    setResponseStatus(event, response.status, response.statusText);
    return "";
  }

  if (!response.ok) {
    const jsonData = await response.json();
    setResponseStatus(event, response.status, response.statusText);
    return {
      status: response.status,
      message: response.statusText,
      details: jsonData.error.details,
    };
  }

  return await response.json();

});
