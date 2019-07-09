fetch('https://reqres.in/api/users')
  .then(res => res.json())
  .then(console.log)
  .catch(console.log)

fetch('https://www.wikipedia.org')
  .then(res => res.text())
  .then(html => {
    console.log(html)
    document.open()
    document.write(html)
    document.close()
  })
  .catch(console.log())