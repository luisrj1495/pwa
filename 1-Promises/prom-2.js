console.log('***********Promesas En cadenadas***********')

const sum = (num, cb) => {
  return new Promise((resolve, reject) => {
    if (num >= 7 ) reject('Error')
    setTimeout(() => {
      resolve(num + 1)
   }, 800)
   })
}

sum(3)
  .then(console.log)
  .catch(console.log)

sum(1)
  .then(num => {
    return sum(num)
  })
  .then(num => sum(num))
  .then(sum)
  .then(console.log)
  .catch(console.log)