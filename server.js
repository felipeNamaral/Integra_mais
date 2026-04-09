require('dotenv').config()
const app = require('./src/app')


require('./src/backend/config/db')  

const authRoutes = require('./src/backend/routes/authRoutes');
app.use('/api', authRoutes);


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

