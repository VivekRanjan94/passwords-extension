chrome.runtime.onMessage.addListener((msg) => {
  if (msg.request === 'url') {
    chrome.runtime.sendMessage({ type: 'url', url: window.location.href })
  }
})

export {}
