const avatarModel = require("../models/avatarModel");
const fs = require("fs");
const path = require("path");

const avatarPadrao = "/assets/img/user.png";
const uploadDir = path.join(__dirname, "..", "..", "..", "uploads");

const extensoesPorMime = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif"
};

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

        const mimeType = match[1];
        const base64 = match[2];
        const extensao = extensoesPorMime[mimeType];
        const buffer = Buffer.from(base64, "base64");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        let nomeArquivo;

        if (req.user.tipo === "empresa") {
            const empresa = await avatarModel.getAvatarEmpresa(req.user.id);
            const cnpjOrigem = cnpjBody || (empresa && empresa.cnpj) || req.user.id;
            const cnpj = String(cnpjOrigem).replace(/\D/g, "") || req.user.id;
            nomeArquivo = `avatar${cnpj}.${extensao}`;
        } else {
            nomeArquivo = `avatarUsuario${req.user.id}.${extensao}`;
        }

        const caminhoArquivo = path.join(uploadDir, nomeArquivo);
        const caminhoBanco = `/uploads/${nomeArquivo}`;

        fs.writeFileSync(caminhoArquivo, buffer);

        if (req.user.tipo === "empresa") {
            await avatarModel.atualizarAvatarEmpresa(req.user.id, caminhoBanco);
        } else {
            await avatarModel.atualizarAvatarUsuario(req.user.id, caminhoBanco);
        }

        return res.json({
            sucesso: true,
            avatar: caminhoBanco
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao salvar avatar" });
    }
};

module.exports = { getAvatar, uploadAvatar };
