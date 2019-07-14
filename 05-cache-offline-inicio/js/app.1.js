

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

if (window.caches) {
    /*
        caches.open('prueba-1') -> crea un nuevo cache
        caches.has('prueba-1') -> pregunta si existe el cache
        caches.delete('prueba-1') -> para borrar el cache
        cache.add('/index.html') -> Añade uno a uno
        cache.delete('/css/style.css') -> Borrar uno de cache especifico
        cache.match('index.html') -> determinar si un archivo existe
        caches.put('/index.html') -> Modificar un cache
        caches.keys() -> Trae los nombres de los caches
        caches.match(ev.request) -> Busca el request en todos los caches que existan

    */

    caches.open('prueba-1')
    caches.open('prueba-2')

    caches.has('prueba-1')
        .then(console.log)
    
    caches.delete('prueba-1')
        .then(console.log)
    
    caches.open('cache-v1.1')
        .then(cache => {
            // cache.add('/index.html')
            cache.addAll([
                '/index.html',
                '/css/style.css',
                '/img/main.jpg'
            ]).then(() => {
                // cache.delete('/css/style.css')
                caches.put('/index.html', new Response('hola mundo'))
            })

            cache.match('index.html')
                .then(response => {
                    console.log(response.text().then(console.log))
                    console.log(response)
                })
        })
    
        caches.keys().then(keys => {
            console.log(keys)
        })
    
    
}