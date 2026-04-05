const User = require('../models/User');
const User = require('../models/Empresa');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    const tipo = "usuario";

    if (!user) {
    user = await Empresa.findByEmail(email);
    tipo = 'empresa';
}

    if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }


    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome  },
        'segredo',
        { expiresIn: '1h' }
    );

    return res.json({ token,tipo });

};

