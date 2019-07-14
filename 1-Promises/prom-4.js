console.log('***********Promise.Race***********')

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


//Retorna la promesa que se ejecute mas rapido
// Si una promesa falla, todo se cancela
Promise.race([sumSlow(3), sumFast(1)])
  .then(console.log)
  .catch(console.log)