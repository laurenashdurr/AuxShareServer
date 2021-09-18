require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  app.use(require('./middleware/headers'))

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const profile = require('./controllers/Profile')
  app.use("/profile", profile)

  const mixes = require('./controllers/Mixes')
  app.use("/mixes", mixes)

  const tracks = require('./controllers/Tracks')
  app.use("/tracks", tracks)

  app.listen(port, () => {
    console.log(`Aux Share app listening at http://localhost:${port}`)
  })
})()