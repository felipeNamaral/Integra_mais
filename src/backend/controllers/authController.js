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

    const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome  },
        'segredo',
        { expiresIn: '1h' }
    );

    return res.json({ token,tipo });

}; 

