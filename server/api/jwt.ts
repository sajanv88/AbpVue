export default defineEventHandler(async (event) => {
  const authSessions = getCookie(event, "auth_session");
  if(!authSessions) {
    throw new Error("Unauthorized: Please login.");
  }
  const auth = JSON.parse(authSessions);

  if (!auth || !auth.tokenSet.access_token) {
    setResponseStatus(event, 401, "Unauthorized");
    return {
      status: 401,
      message: "Unauthorized: Please login.",
    };
  }

  const tokenSet = auth.tokenSet;
  return { jwt: tokenSet };
});
