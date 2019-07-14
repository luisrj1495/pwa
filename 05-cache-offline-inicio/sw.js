const CACHE_STATIC_NAME = 'static-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const CACHE_IMMUTABLE_NAME = 'immutable-v1'

function cleanCache (cacheName, numItem) {
  caches.open(cacheName)
    .then(cache => {
      return cache.keys()
              .then(keys => {
                console.log(keys)
                if (keys.length > numItem) {
                  cache.delete(keys[0])
                    .then(cleanCache(cacheName, numItem))
                }
              })
    })
}

self.addEventListener('install', ev => {
  const cachePromise = caches.open(CACHE_STATIC_NAME)
  .then(cache => {
    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      'img/main.jpg',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
      '/js/app.js'
    ])
  })

  const cacheImmutable = caches.open(CACHE_IMMUTABLE_NAME)
  .then(cache => {
    return cache.addAll([
      'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
    ])
  })
  ev.waitUntil(
    Promise.all(
      [
        cachePromise,
        cacheImmutable
      ]
    )
    
  )
  
})

self.addEventListener('fetch', ev => {
  // 4 - Cache with network update
  if (ev.request.url.includes('bootstrap')){
   return ev.respondWith(caches.match(ev.request))
  }
  const respuesta = caches.open(CACHE_STATIC_NAME)
    .then(cache => {
      //Primero devuelve lo que esta en cache
      // pero lo actualiza para la proxima actualización
      fetch(ev.request)
        .then(newRes => {
          cache.put(ev.request, newRes)
        })
      return cache.match(e.request)
    })

    ev.respondWith(respuesta)

})