export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = await getSession(event, { password: config.sessionSecret });

  if (Object.keys(session.data).length === 0) {
    setResponseStatus(event, 401, 'Unauthorized');
    return {
      status: 401,
      message: 'Unauthorized: Please login.',
    };
  }
  const user = session.data.user;
  return user;
});
