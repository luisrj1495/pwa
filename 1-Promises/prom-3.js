console.log('***********Promesa.ALL***********')

const sumSlow = num => {
  return new Promise((resolve, reject) => {
    // console.log("**sumSlow**")
    if (num >= 7 ) reject('Error')
    setTimeout(() => {
      resolve(num + 1)
   }, 800)
   })
}

const sumFast = num => {
  return new Promise((resolve, reject) => {
    // console.log("**sumFast**")
    if (num >= 7 ) reject('Error')
    setTimeout(() => 
      resolve(num + 1)
   , 300)
   })
}

sumSlow(3)
  .then(console.log)
  .catch(console.log)

sumFast(1)
  .then(console.log)
  .catch(console.log)

//Si una promesa falla, todas falan
Promise.all([sumSlow(3), sumFast(1)])
  .then(console.log)
  .catch(console.log)