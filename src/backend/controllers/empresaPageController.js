const empresaPageModel = require("../models/empresaPageModel");

const getEmpresaPage = async (req, res) => {
    try{
        const {id} = req.query;
        const empresa = await empresaPageModel.getEmpresa(id);
        res.json(empresa);

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar empresa" });
    }
};

module.exports = { getEmpresaPage };