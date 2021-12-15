console.log('Extension Started...')

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.sender === 'popup') {
    chrome.runtime.sendMessage({ sender: 'content', url: window.location.href })
  }
})

export {}
