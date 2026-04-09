const express = require('express')
const cors = require('cors')
const path = require('path')



const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'frontend')))

const db = require('./backend/config/db') // confere o caminho

app.get('/usuario', (req, res) => {
    const sql = 'SELECT * FROM usuario'

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ erro: 'Erro no banco' })
        }

        res.json(result)
    })
})

module.exports = app