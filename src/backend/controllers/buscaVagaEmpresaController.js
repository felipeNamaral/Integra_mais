const bd = require("../models/buscaVagaEmpresaModel");

const buscaVagaEmpresa = async (req, res) => {
    try{
        const id = req.user.id;
        const response = await bd.getVaga(id);
        res.json(response);

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar vagas" });
    }
};

module.exports = { buscaVagaEmpresa };