import { setStoredCities, setStoredOptions } from '../utils/storage'

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // sendResponse("from bgscript");
  setStoredCities([])
  setStoredOptions({
    tempScale: 'metric',
  })
})
