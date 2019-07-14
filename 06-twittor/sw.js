importScripts('/js/sw-utils.js')

const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'
const IMMUTABLE_CACHE = 'immutable-v1'

const APP_SHELL = [
  '/',
  '/index.html',
  '/css/style.css',
  'img/favicon.ico',
  '/img/avatars/hulk.jpg',
  '/img/avatars/ironman.jpg',
  '/img/avatars/spiderman.jpg',
  '/img/avatars/thor.jpg',
  '/img/avatars/wolverine.jpg',
  '/js/app.js',
  '/js/sw-utils.js'
]


const APP_SHELL_IMMUTABLE = [
  'https://fonts.googleapis.com/css?family=Quicksand:300,400',
  'https://fonts.googleapis.com/css?family=Lato:400,300',
  'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
  '/css/animate.css',
  '/js/libs/jquery.js'
]

self.addEventListener('install', ev => {
  const cacheStatic = caches.open(STATIC_CACHE)
                        .then(cache => cache.addAll(APP_SHELL))

  const cacheImmutable = caches.open(IMMUTABLE_CACHE)
                        .then(cache => cache.addAll(APP_SHELL_IMMUTABLE))
  
  ev.waitUntil(Promise.all([cacheStatic, cacheImmutable]))
})

self.addEventListener('fetch', ev => {

  const cacheQuery = caches.match(ev.request)
                    .then(res => {
                      console.log(res)
                      if (res) return res
                      return fetch(ev.request.url)
                                  .then(newRes => {
                                    return updateDynamicCache(
                                      DYNAMIC_CACHE,
                                      ev.request,
                                      newRes
                                    )
                                  })
                    })

  ev.respondWith(cacheQuery)
})


self.addEventListener('activate', event => {
  const cacheWhitelist = [STATIC_CACHE, IMMUTABLE_CACHE]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})
