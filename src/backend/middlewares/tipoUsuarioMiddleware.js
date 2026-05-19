const permitirTipos = (...tiposPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !tiposPermitidos.includes(req.user.tipo)) {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Acesso negado para este tipo de usuario"
      });
    }

    next();
  };
};

module.exports = permitirTipos;
