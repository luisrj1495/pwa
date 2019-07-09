console.log('**Trabajando con Imágenes**')

const imagen = document.querySelector('img')
fetch('./astronaut.jpg')
  .then(res => res.blob())
  .then(data => {
    const path = URL.createObjectURL(data)
    imagen.src = path
    console.log(data)
  })
  .catch(console.log)

