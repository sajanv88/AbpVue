const pollingDelayInMilliSeconds = 1000 * 30; // 30 seconds
setInterval(async () => {
  const url = "/api/user";
  const response = await fetch(url);
  const data = await response.json();
  const unauthorizedMessage = {
    message: "Unauthorized",
    code: response.status,
  };
  if (!response.ok || response.status === 401) {
    return self.postMessage(unauthorizedMessage);
  }
  self.postMessage(data);
}, pollingDelayInMilliSeconds);
