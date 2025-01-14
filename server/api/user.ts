export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const authSessions = getCookie(event, "auth_session");
  if(!authSessions) {
    throw new Error("Unauthorized: Please login.");
  }
  const auth = JSON.parse(authSessions);
  const token = auth.tokenSet.access_token;

  const abpUrl = config.abpApiEndpoint + "/account/my-profile";


  if (!auth || !token) {
    setResponseStatus(event, 401, "Unauthorized");

    return {
      status: 401,
      message: "Unauthorized: Please login.",
    };
  }

  const profile = await fetch(abpUrl, {
    headers: {
      Authorization: `Bearer ${token}`
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
