


self.addEventListener('fetch', event => {
  const offlineResp = new Response(`
    <h1>Necesitas internet para usarla</h1>
  `, {headers: {'Content-type': 'text/html'}})


  const resp = fetch(event.request)
                  .catch(() => {
                    return offlineResp
                  })
  event.respondWith(resp)
})