self.addEventListener('install', (e) => {
  e.waitUntil(
    console.log('Service worker installed'),
    self.skipWaiting()
  )
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    console.log('Service worker activated'),
    self.clients.claim()
  )
})

self.addEventListener('fetch', (e) => {
  console.log('Request received...')
  if (
    e.request.headers.has('accept') &&
    e.request.headers.get('accept').match(/^image\//i)
  ) {
    e.respondWith(
      fetch('https://source.unsplash.com/random?lizard')
    )
  }

})

const config = {
  chance: 0.50
}

function demeter(details) {
  if (!details.url.match(/icon|logo/i)) {
    if (Math.random() < config.chance) {
      console.log('Replacing:', details.url)
      return {
        redirectUrl: "https://source.unsplash.com/random?lizard"
      };
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  demeter,
  {
    urls: ["*://*.microsoft.com/*"],
    types: ["image"]
  },
  ["blocking"]
);