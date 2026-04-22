const usuarioPageModel = require("../models/ususarioPageModel");

const getUsuarioPage = async (req, res) => {
    try {

        const id = req.user.id;
        
        const usuario = await usuarioPageModel.getUsuario(id);
        res.json(usuario);

    } catch (err) {
        console.error(err);

        res.status(500).json({ message: "Erro ao buscar usuário" });
    }
};

module.exports = { getUsuarioPage };