const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Sem token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'segredo');

    req.user = decoded; 

    next();  
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};