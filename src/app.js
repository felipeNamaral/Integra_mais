const express = require('express')
const cors = require('cors')
const path = require('path')

const vagaRoutes = require('./backend/routes/vagaRoutes')
const cadastroRoutes = require('./backend/routes/cadastroRoutes')
const perfilRoutes = require('./backend/routes/perfilRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'frontend')))

// ROTAS BACKEND
app.use('/api', cadastroRoutes)
app.use('/api', perfilRoutes)
app.use('/api', vagaRoutes)

module.exports = app