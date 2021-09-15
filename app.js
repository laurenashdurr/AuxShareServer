require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  // app.use(require('./middleware/headers'))

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const mixes = require('./controllers/Mixes')
  app.use("/mixes", mixes)

  app.listen(port, () => {
    console.log(`Aux Share app listening at http://localhost:${port}`)
  })
})()