const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontend')));

// DB
require('./backend/config/db');

// ROTAS
const authRoutes = require('./backend/routes/authRoutes');
const healthRoutes = require('./backend/routes/healthRoutes');

app.use('/api', authRoutes);
app.use('/api', healthRoutes);

// teste simples
const db = require('./backend/config/db');

app.get('/usuario', (req, res) => {
    db.query('SELECT * FROM usuario', (err, result) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco' });
        }
        res.json(result);
    });
});

module.exports = app;