console.log("content script");

chrome.runtime.sendMessage("From content script", (res) => console.log(res));
