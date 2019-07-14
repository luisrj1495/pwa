const CACHE_NAME = 'cache-v1'
const CACHE_STATIC_NAME = 'static-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const CACHE_IMMUTABLE_NAME = 'immutable-v1'

self.addEventListener('install', ev => {
  const cachePromise = caches.open(CACHE_NAME)
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
  ev.waitUntil(
    cachePromise
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
        return fetch(e.request)
          .then(newRes => {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(ev.request, newRes)
              })
            return newRes.clone()
          })
      })


})