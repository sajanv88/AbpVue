export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await getSession(event, { password: config.sessionSecret });
  const abpUrl = config.abpApiEndpoint + "/account/my-profile";

  if (Object.keys(session.data).length === 0) {
    setResponseStatus(event, 401, "Unauthorized");

    return {
      status: 401,
      message: "Unauthorized: Please login.",
    };
  }
  const profile = await fetch(abpUrl, {
    headers: {
      Authorization: `Bearer ${session.data.tokenSet.access_token}`,
    },
  });

  if (!profile.ok || profile.status === 401) {
    setResponseStatus(event, 401, "Unauthorized");
    return {
      status: 401,
      message: "Unauthorized: Please login.",
    };
  }
  const profileData = await profile.json();
  const user = {
    isAuthenticated: "true",
    ...profileData,
  };
  return user;
});
