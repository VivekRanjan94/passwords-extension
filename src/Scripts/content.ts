console.log('Extension Started...')

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.request === 'url') {
    chrome.runtime.sendMessage({ type: 'url', url: window.location.href })
  }
  if (msg.request === 'env') {
    chrome.runtime.sendMessage({
      type: 'env',
      env: { SERVER_URL: process.env.SERVER_URL },
    })
  }
})

export {}
