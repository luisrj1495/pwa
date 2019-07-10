//Cuando se detecta un cambio en el service worker
// se activa de nuevo todo el ciclo de vida de este


self.addEventListener('fetch', event => {
  console.log("SW: Interceptando el FETCH")
  console.log(event)
  console.log('**URL Peticiones**')
  console.log(event.request.url)
  console.log('**URL Peticiones**')

  /*
   ***** Manejando errores de archivos que no encontro *****
    - Ahí se evalua si la respuesta fallo y si es una imagen
    - Un Error 404 NO ES INTERPRETADO POR EL CATCH
    - El event.respondWith debe haber una promesa que regrese una respuesta
  */

  event.respondWith(
    fetch(event.request)
      .then(res => {
        return res.ok ? res : fetch('img/astro.gif')
      })
  )


  /*
      Interceptando imagenes y mostrando como se puede 
      responder con otras imagenes
  */

    if (event.request.url.includes('main.jpg')) {
      // const photoReq = fetch(event.request.url)
      const photoReq = fetch('img/main-patas-arriba.jpg')
      /*
         Tambien se le puede enviar el Objero Request completo como se ve 
         acontinuación
      */
      // const photoReq = fetch(event.request)
      event.respondWith(photoReq)
    } else if (event.request.url.includes('style.css')) {
      /*
        El respondWith es para responder las peticiones interceptadas 
        con algo nuevo o con lo que vienen
        ***Forma de bloquear algun fetch** -> event.respondWith(null)
      */
      //event.respondWith(null)

      /*
        Sobreescribiendo el archivo css
        1. Se intercepta
        2. Se Crea un un objeto Response -> es el resultado de peticiones fetch
        3. Se monta el nuevo css
      */
        const newStyle = `
          body {
            background-color: gray !important;
            color: purple;
            font-size: 20px;
          }
        
        `
        const response = new Response(newStyle,{
          headers: {
            'Content-Type': 'text/css'
          }
        })
        event.respondWith(response)
  } else {
    event.respondWith(fetch(event.request))
  }

})