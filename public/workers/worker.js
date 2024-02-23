const pollingDelayInMilliSeconds = 1000 * 30; // 30 seconds
setInterval(async () => {
  const url = "/api/abpServiceProxy/account/my-profile";
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    self.postMessage({ message: "Unauthorized", code: response.status });
    return;
  }
  if (response.status === 401) {
    self.postMessage({ message: "Unauthorized", code: response.status });
  } else {
    self.postMessage({ message: "Authorized", code: response.status });
  }
}, pollingDelayInMilliSeconds);
