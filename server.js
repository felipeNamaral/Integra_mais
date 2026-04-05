require('dotenv').config()
const app = require('./src/app')


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})


const authRoutes = require('./src/backend/routes/authRoutes');
app.use('/api', authRoutes);