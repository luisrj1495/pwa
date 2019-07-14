/*
  Ciclo de vida del SW
  - El sw se activa solo cuando se cierra todas las pestañas que este tiene 
  abiertas.
  - event.waitUntil(promise) - espera hasta que lo de adentro se ejecuta
  -  self.skipWaiting() -> Actualiza automaticamente el sw
*/

const installation = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('SW: Instalaciones terminadas')
    self.skipWaiting()
    resolve()
  }, 1);
})


self.addEventListener('install', event => {
  console.log('** Install SW **')
  // console.log(event)
  /*
    En la instalación se descargan assets
    Se crea un cache
  */

 installation()
})

// Cuando el sw toma control de la aplicacion
self.addEventListener('activate', event => {
  /*
    - Borrar cache viejo
  */
  console.log('** Activate and ready to use sw***')
})

// Fetch: Manejo de peticiones http

self.addEventListener('fetch', event => {
  /*
    Aplicar estrategias del cache
  */
  console.log('sw: Fetch', event.request.url)

  //Interceptar
  if(event.request.url.includes('reqres.in')) {
    const newResponse = new Response(`{ok: false, msh: 'Hacked!'}`)
    event.respondWith(newResponse)
  }
})

// SYNC: Cuando perdemos la conexion y la recuperamos

self.addEventListener('sync', event => {
    console.log('**Tenemos conexion**')
    console.log(event)
    console.log(event.tag)
})

// Push: Manejar las push notification

self.addEventListener('push', event => {
  console.log('NOtificacion recibida')
})