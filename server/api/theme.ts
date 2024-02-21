export default defineEventHandler(async (event) => {
  const query = getQuery<{ theme: string }>(event);

  if (query.theme) {
    setCookie(event, "theme", query.theme);
    setResponseStatus(event, 200, "OK");
    return { theme: query.theme };
  }

  const theme = getCookie(event, "theme");
  if (theme) {
    setResponseStatus(event, 200, "OK");
    return { theme };
  }

  setCookie(event, "theme", "dark");
  setResponseStatus(event, 200, "OK");
  return { theme: "dark" };
});
