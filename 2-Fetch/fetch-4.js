console.log('**Lectura de HTML**')

fetch('./notfound.html')
  .then(res => {
    if (res.ok) {
      return res.text()
    } else {
      throw new Error("NO existe el usuario 1000")
    }
  })
  .then(html => {
    document.write(html)
  })
  .catch(console.log)