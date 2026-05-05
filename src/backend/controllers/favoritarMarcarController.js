const model = require("../models/favoritarMarcarModel");

const favoritar = async (req, res) => {
    try {
        const idUsuario = req.user.id;
        const { idVaga } = req.body;

        await model.favoritar(idUsuario, idVaga);

        return res.json({ favoritada: true });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const desfavoritar = async (req, res) => {
    try {
        const idUsuario = req.user.id;
        const { idVaga } = req.body;

        await model.desfavoritar(idUsuario, idVaga);

        return res.json({ favoritada: false });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const marcar = async (req, res) => {
    try {
        const idUsuario = req.user.id;
        const { idVaga } = req.body;

        await model.marcar(idUsuario, idVaga);

        return res.json({ enviada: true });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const desmarcar = async (req, res) => {
    try {
        const idUsuario = req.user.id;
        const { idVaga } = req.body;

        await model.desmarcar(idUsuario, idVaga);

        return res.json({ enviada: false });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = { favoritar, desfavoritar,marcar,desmarcar };