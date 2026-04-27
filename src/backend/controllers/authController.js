const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findByEmail(email);
    let tipo = "usuario";

    if (!user) {
        user = await User.findByEmailEmpresa(email);
        tipo = 'empresa';
    }

    if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }


    const senhaValida = await bcrypt.compare(password, user.senha);

    if (!senhaValida) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    let token;

    if (tipo === 'usuario') {
        token = jwt.sign(
            { id: user.ID_usuario, email: user.email, nome: user.nome, tipo },
            'segredo',
            { expiresIn: '1h' }
        );
    } else {
        token = jwt.sign(
            { id: user.ID_empresa, email: user.email, nome: user.nome, tipo },
            'segredo',
            { expiresIn: '1h' }
        );
    }


    return res.json({ token, tipo });

};

