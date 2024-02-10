import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await getSession(event, { password: config.sessionSecret });
  const { data } = session;

  const path = event.path.replace("/api/abpServiceProxy", "");
  const targetUrl = joinURL(config.abpApiEndpoint, path);
  console.log(targetUrl, "targetUrl");
  return await proxyRequest(event, targetUrl, {
    headers: {
      Authorization: `Bearer ${data.tokenSet.access_token}`,
    },
  });
});
