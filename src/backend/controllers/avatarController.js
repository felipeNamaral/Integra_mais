const avatarModel = require("../models/avatarModel");
const { v2: cloudinary } = require("cloudinary");

const avatarPadrao = "/assets/img/user.png";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const getAvatar = async (req, res) => {
    try {
        const perfil = req.user.tipo === "empresa"
            ? await avatarModel.getAvatarEmpresa(req.user.id)
            : await avatarModel.getAvatarUsuario(req.user.id);
        const avatar = perfil && perfil.avatar ? perfil.avatar : avatarPadrao;

        return res.json({ avatar });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao buscar avatar" });
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const { imagem, cnpj: cnpjBody } = req.body;

        if (!imagem) {
            return res.status(400).json({ message: "Imagem nao enviada" });
        }

        const match = imagem.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/);

        if (!match) {
            return res.status(400).json({ message: "Formato de imagem invalido" });
        }

        let publicId;

        if (req.user.tipo === "empresa") {
            const empresa = await avatarModel.getAvatarEmpresa(req.user.id);
            const cnpjOrigem = cnpjBody || (empresa && empresa.cnpj) || req.user.id;
            const cnpj = String(cnpjOrigem).replace(/\D/g, "") || req.user.id;
            publicId = `avatar${cnpj}`;
        } else {
            publicId = `avatarUsuario${req.user.id}`;
        }

        const resultado = await cloudinary.uploader.upload(imagem, {
            folder: "integra/avatar",
            public_id: publicId,
            overwrite: true,
            resource_type: "image"
        });
        const avatar = resultado.secure_url;

        if (req.user.tipo === "empresa") {
            await avatarModel.atualizarAvatarEmpresa(req.user.id, avatar);
        } else {
            await avatarModel.atualizarAvatarUsuario(req.user.id, avatar);
        }

        return res.json({
            sucesso: true,
            avatar
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao salvar avatar" });
    }
};

module.exports = { getAvatar, uploadAvatar };
