console.log('**Response Clone**')

fetch('https://reqres.in/api/users/1')
  .then(res => {
    //No se puede leer el body dos veces
    res.clone().json()
      .then(console.log)
      .catch(console.log)
    
    res.json()
      .then(console.log)
      .catch(console.log)
  })
  .then(console.log)
  .catch(console.log)

console.log("**Manejo de Errores**")

fetch('https://reqres.in/api/users/1000')
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error("NO existe el usuario 1000")
    }
  })
  .then(console.log)
  .catch(console.log)