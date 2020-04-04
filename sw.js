const staticCacheName = 'mamafood-static-v2';
const dynamicCacheName = 'mamafood-dynamic-v1';
const assets = [
    '/',
    './index.html',
    './pages/contact.html',
    './pages/about.html',
    './404.html',
    './css/materialize.min.css',
    './css/styles.css',
    './js/materialize.min.js',
    './js/ui.js',
    './img/dish.png',
    './sw.js'
];



// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });
  

  // this code clears all cache when a new sw is registered 
  // because this event fired only when a sw is registered in the browsre for the first time 
  // activate event
  self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        // we get every thing in the cache width caches.keys()
        // then we pass each key into the function that delete this key 
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });
  
  // fetch event
  self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          })
        });
      }).catch(() => caches.match('/pages/fallback.html'))
    );
  });