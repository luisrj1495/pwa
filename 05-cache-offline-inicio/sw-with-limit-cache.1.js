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
  /*
    Estrategias de cache
      1- CACHE ONLY -> Se usa cuando se quiere que todas las peticiones salgan del cache
      Nada de la red
      2- Cache with network fallback -> Intenta primero en el cache pero sino esta traelo de internet
  */
  //EStrategia No.1
    // ev.respondWith(
    //   caches.match(ev.request)
    // )

    //Estrategia No.2

    caches.match(ev.request)
      .then(res => {
        if (res) return res
        // Si entra aca, el archivo no existe
        // Debe ir a la web
        console.log('no existe', ev.request.url)
        return fetch(ev.request)
          .then(newRes => {
            caches.open(CACHE_DYNAMIC_NAME)
              .then(cache => {
                cache.put(ev.request, newRes)
                cleanCache(CACHE_DYNAMIC_NAME, 5)
              })
            return newRes.clone()
          })
      })


})