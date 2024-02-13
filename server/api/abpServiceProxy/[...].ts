import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await getSession(event, { password: config.sessionSecret });
  const { data } = session;

  if (!data.tokenSet) {
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
  const headers = getHeaders(event);
  try {
    return await proxyRequest(event, targetUrl, {
      headers: {
        Authorization: `Bearer ${data.tokenSet.access_token}`,
        RequestVerificationToken: verificationToken,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...headers,
      },
    });
  } catch (e) {
    console.log("Error caught: ", e);
    setResponseStatus(event, 500, "Internal Server Error");
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
});
