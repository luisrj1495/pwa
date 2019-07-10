//Revisar si existe el objeto service worker dentro de navigator

if (navigator.serviceWorker) {
  console.log("Sw se puede Usar")
  navigator.serviceWorker.register('/sw.js')
}