const express = require('express');
const cors = require('cors');
const path = require('path');

const vagaRoutes = require('./backend/routes/vagaRoutes');
const cadastroRoutes = require('./backend/routes/cadastroRoutes');
const perfilRoutes = require('./backend/routes/perfilRoutes');
const avatarRoutes = require('./backend/routes/avatarRoutes');
const senhaRoutes = require('./backend/routes/senhaRoutes');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ROTAS
const authRoutes = require('./backend/routes/authRoutes');
const healthRoutes = require('./backend/routes/healthRoutes');
const empresaPageRoutes = require('./backend/routes/empresaPageRoutes');
const ususarioPageRoutes = require('./backend/routes/usuarioPageRoutes');
const vagasFavoritasRoutes = require('./backend/routes/VagasFavoritadasRoutes.js');
const vagasEnviadasRoutes = require('./backend/routes/VagasEnviadasRoutes');
const buscaVagaRoutes = require('./backend/routes/buscaVagaRoutes');
const getAllVagas = require('./backend/routes/getAllVagas');
const getVagaById = require('./backend/routes/getVagaById');
const verificaSeVFavorita = require('./backend/routes/verificaSeFavoritaRoutes');
const verificaSeEnviado = require('./backend/routes/verificaSeEnviadoRoutes');
const buscaVagaEmpresa = require('./backend/routes/buscaVagaEmpresaRoutes');
const favoritarMarcar = require('./backend/routes/favoritarMarcarRoutes');

//ROTAS
app.use('/api', authRoutes);
app.use('/api', healthRoutes);
app.use('/api', empresaPageRoutes);
app.use('/api', ususarioPageRoutes);
app.use('/api', vagasFavoritasRoutes);
app.use('/api', vagasEnviadasRoutes);
app.use('/api', buscaVagaRoutes);
app.use('/api', getAllVagas); 
app.use('/api', getVagaById); 
app.use('/api', verificaSeVFavorita); 
app.use('/api', verificaSeEnviado); 
app.use('/api', cadastroRoutes);
app.use('/api', perfilRoutes);
app.use('/api', avatarRoutes);
app.use('/api', senhaRoutes);
app.use('/api', vagaRoutes);
app.use('/api', buscaVagaEmpresa);
app.use('/api', favoritarMarcar);



module.exports = app;
