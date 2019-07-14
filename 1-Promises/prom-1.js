console.log('***********CallBacks***********')

const sum = (num, cb) => {
  setTimeout(() => {
     cb(num + 1)
  }, 800)
}


sum(7, (num) => {
  console.log(num)
  sum(num, (num2) => {
    console.log(num2)
  })
})