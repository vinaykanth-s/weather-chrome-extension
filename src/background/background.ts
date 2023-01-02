chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log({ msg, sender });
  sendResponse("from bgscript");
});
