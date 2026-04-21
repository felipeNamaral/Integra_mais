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
const empresaPageRoutes = require('./backend/routes/empresaPageRoutes');
const ususarioPageRoutes = require('./backend/routes/usuarioPageRoutes')
const vagasFavoritasRoutes = require('./backend/routes/VagasFavoritadasRoutes.js');
const vagasEnviadasRoutes = require('./backend/routes/VagasEnviadasRoutes');
const buscaVagaRoutes = require('./backend/routes/buscaVagaRoutes');


app.use('/api', authRoutes);
app.use('/api', healthRoutes);
app.use('/api', empresaPageRoutes);
app.use('/api', ususarioPageRoutes);
app.use('/api', vagasFavoritasRoutes);
app.use('/api', vagasEnviadasRoutes);
app.use('/api', buscaVagaRoutes);
    

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