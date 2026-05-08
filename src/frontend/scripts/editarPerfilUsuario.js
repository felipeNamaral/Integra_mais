const token = localStorage.getItem('token');
const avatarPadrao = "/assets/img/user.png";

const nomeHeader = document.getElementById('nome');
const nomeUsuario = document.getElementById('txt-editar-usuario-004');
const emailUsuario = document.getElementById('txt-editar-usuario-005');
const telefoneUsuario = document.getElementById('telefoneUsuarioEditar');
const idadeUsuario = document.getElementById('txt-editar-usuario-006');
const nacionalidadeUsuario = document.getElementById('nacionalidadeUsuario');
const escolaridadeUsuario = document.getElementById('escolaridadeUsuario');
const formacaoUsuario = document.getElementById('formacaoUsuario');
const idiomasUsuario = document.getElementById('idiomasUsuario');
const descricaoUsuario = document.getElementById('descricaoUsuario');
const formEditarUsuario = document.getElementById('formEditarUsuario');
const btnEditarAvatar = document.getElementById('btnEditarAvatar');
const inputAvatar = document.getElementById('inputAvatar');

let usuarioAtual = {};

async function carregarAutenticacao() {
    const response = await fetch('http://localhost:3000/api/protected', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    nomeHeader.textContent = data.nome;
    await carregarAvatar();
}

async function carregarAvatar() {
    try {
        const response = await fetch('http://localhost:3000/api/avatar', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        const avatar = data.avatar || avatarPadrao;
        aplicarAvatarNaTela(avatar);
    } catch (error) {
        console.error('Erro ao carregar avatar:', error);
    }
}

function aplicarAvatarNaTela(avatar) {
    const imagensAvatar = document.querySelectorAll('img[src="/assets/img/user.png"], img#avatar');
    const botaoAvatar = document.getElementById('avatar');

    imagensAvatar.forEach((imagem) => {
        imagem.src = avatar;
        imagem.onerror = () => {
            imagem.src = avatarPadrao;
        };
    });

    if (botaoAvatar) {
        botaoAvatar.textContent = "";
        botaoAvatar.style.backgroundImage = `url("${avatar}")`;
        botaoAvatar.style.backgroundSize = "cover";
        botaoAvatar.style.backgroundPosition = "center";
    }
}

function arquivoParaBase64(arquivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(arquivo);
    });
}

function configurarUploadAvatar() {
    btnEditarAvatar.addEventListener('click', () => {
        inputAvatar.click();
    });

    inputAvatar.addEventListener('change', async () => {
        const arquivo = inputAvatar.files[0];

        if (!arquivo) return;

        try {
            const imagem = await arquivoParaBase64(arquivo);
            const response = await fetch('http://localhost:3000/api/avatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ imagem })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Erro ao enviar avatar.");
                return;
            }

            aplicarAvatarNaTela(data.avatar);
            usuarioAtual.avatar = data.avatar;
        } catch (error) {
            console.error('Erro ao enviar avatar:', error);
            alert("Erro ao enviar avatar.");
        } finally {
            inputAvatar.value = "";
        }
    });
}

async function carregarDadosUsuario() {
    const response = await fetch('http://localhost:3000/api/usuario', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    usuarioAtual = await response.json();

    nomeUsuario.textContent = usuarioAtual.nome || "";
    emailUsuario.textContent = usuarioAtual.email || "";
    telefoneUsuario.textContent = usuarioAtual.telefone || "";
    idadeUsuario.textContent = usuarioAtual.idade ? `${usuarioAtual.idade} anos` : "";
    nacionalidadeUsuario.value = usuarioAtual.nacionalidade || "";
    escolaridadeUsuario.value = usuarioAtual.escolaridade || "";
    formacaoUsuario.value = usuarioAtual.formacao || "";
    idiomasUsuario.value = usuarioAtual.idioma || usuarioAtual.idiomas || "";
    descricaoUsuario.value = usuarioAtual.descricao || "";
}

function configurarEdicaoRapida() {
    document.querySelectorAll('[data-editar]').forEach((botao) => {
        botao.addEventListener('click', () => {
            const campo = botao.dataset.editar;

            if (campo === "idade") {
                return;
            }

            const alvos = {
                nome: nomeUsuario,
                email: emailUsuario,
                telefone: telefoneUsuario
            };

            const alvo = alvos[campo];
            if (!alvo) return;

            transformarEmInput(alvo);
        });
    });
}

function transformarEmInput(elemento) {
    const inputExistente = elemento.querySelector('.campo-edicao-inline');

    if (inputExistente) {
        inputExistente.focus();
        return;
    }

    const valorAtual = getValorCampoInline(elemento);
    const input = document.createElement('input');

    input.type = 'text';
    input.className = 'campo-edicao-inline';
    input.value = valorAtual;

    elemento.textContent = '';
    elemento.appendChild(input);
    input.focus();
    input.select();

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            confirmarInputInline(elemento, input);
        }

        if (event.key === 'Escape') {
            elemento.textContent = valorAtual;
        }
    });

    input.addEventListener('blur', () => {
        confirmarInputInline(elemento, input);
    });
}

function confirmarInputInline(elemento, input) {
    if (!elemento.contains(input)) return;

    elemento.textContent = input.value.trim();
}

function getValorCampoInline(elemento) {
    const input = elemento.querySelector('.campo-edicao-inline');
    return input ? input.value.trim() : elemento.textContent.trim();
}

async function salvarPerfilUsuario(event) {
    event.preventDefault();

    const dados = {
        nome: getValorCampoInline(nomeUsuario),
        email: getValorCampoInline(emailUsuario),
        telefone: getValorCampoInline(telefoneUsuario),
        nacionalidade: nacionalidadeUsuario.value.trim(),
        escolaridade: escolaridadeUsuario.value.trim(),
        formacao: formacaoUsuario.value.trim(),
        idiomas: idiomasUsuario.value.trim(),
        descricao: descricaoUsuario.value.trim()
    };

    try {
        const response = await fetch('http://localhost:3000/api/perfil/usuario', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.mensagem || "Erro ao atualizar perfil.");
            return;
        }

        alert(data.mensagem || "Perfil atualizado com sucesso.");
        window.location.href = "/pages/perfil_usuario.html";
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        alert("Erro ao salvar perfil.");
    }
}

async function initEditarUsuario() {
    try {
        await carregarAutenticacao();
        await carregarDadosUsuario();
        configurarEdicaoRapida();
        configurarUploadAvatar();
        formEditarUsuario.addEventListener('submit', salvarPerfilUsuario);
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        alert("Erro ao carregar perfil.");
    }
}

initEditarUsuario();
