

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
        .then(req => {
            setTimeout(() => {
                req.sync.register('posteo-gatos')
                console.log('se enviaron fotos de gatos')
            }, 3000);
            Notification.requestPermission()
                .then(res => {
                    console.log(res)
                    req.showNotification('Hola mundo')
                })
        })

}

fetch('https://reqres.in/api/users/1')
    .then(res => res.text())
    .then(console.log)


    // Validando si el sync existe en el navegador
if (window.SyncManager) {

}