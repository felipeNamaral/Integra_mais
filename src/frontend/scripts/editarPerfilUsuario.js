const token = localStorage.getItem('token');
const avatarPadrao = "/assets/img/user.png";

const nomeHeader = document.getElementById('nome');
const nomeUsuario = document.getElementById('nomeUsuarioEditar');
const emailUsuario = document.getElementById('emailUsuarioEditar');
const telefoneUsuario = document.getElementById('telefoneUsuarioEditar');
const dataNascimentoUsuario = document.getElementById('dataNascimentoUsuarioEditar');
const nacionalidadeUsuario = document.getElementById('nacionalidadeUsuario');
const escolaridadeUsuario = document.getElementById('escolaridadeUsuario');
const formacaoUsuario = document.getElementById('formacaoUsuario');
const idiomasUsuario = document.getElementById('idiomasUsuario');
const descricaoUsuario = document.getElementById('descricaoUsuario');
const formEditarUsuario = document.getElementById('formEditarUsuario');
const btnEditarAvatar = document.getElementById('btnEditarAvatar');
const inputAvatar = document.getElementById('inputAvatar');

let usuarioAtual = {};

const limitesCamposUsuario = {
    nome: 100,
    email: 100,
    telefone: 15,
    nacionalidade: 50,
    escolaridade: 50,
    formacao: 100,
    idiomas: 50,
    descricao: 500
};

async function carregarAutenticacao() {
    const response = await fetch('/api/protected', {
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
        const response = await fetch('/api/avatar', {
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
            const response = await fetch('/api/avatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ imagem })
            });

            const data = await response.json();

            if (!response.ok) {
                mostrarPopup(data.message || "Erro ao enviar avatar.", "error");
                return;
            }

            aplicarAvatarNaTela(data.avatar);
            usuarioAtual.avatar = data.avatar;
        } catch (error) {
            console.error('Erro ao enviar avatar:', error);
            mostrarPopup("Erro ao enviar avatar.", "error");
        } finally {
            inputAvatar.value = "";
        }
    });
}

async function carregarDadosUsuario() {
    const response = await fetch('/api/usuario', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    usuarioAtual = await response.json();

    nomeUsuario.textContent = usuarioAtual.nome || "";
    emailUsuario.textContent = usuarioAtual.email || "";
    telefoneUsuario.textContent = usuarioAtual.telefone || "";
    dataNascimentoUsuario.textContent = formatarDataNascimento(usuarioAtual.data_nascimento) || "";
    nacionalidadeUsuario.value = usuarioAtual.nacionalidade || "";
    escolaridadeUsuario.value = usuarioAtual.escolaridade || "";
    formacaoUsuario.value = usuarioAtual.formacao || "";
    idiomasUsuario.value = usuarioAtual.idioma || usuarioAtual.idiomas || "";
    descricaoUsuario.value = usuarioAtual.descricao || "";
}

function normalizarDataInput(data) {
    if (!data) return "";
    return String(data).split("T")[0];
}

function formatarDataNascimento(data) {
    const dataNormalizada = normalizarDataInput(data);

    if (!dataNormalizada) {
        return usuarioAtual.idade ? `${usuarioAtual.idade} anos` : "";
    }

    const [ano, mes, dia] = dataNormalizada.split("-");
    if (!ano || !mes || !dia) return dataNormalizada;

    return `${dia}/${mes}/${ano}`;
}

function limitarTexto(valor, limite) {
    return String(valor || "").trim().slice(0, limite);
}

function limitarNumeros(valor, limite) {
    return String(valor || "").replace(/\D/g, "").slice(0, limite);
}

function configurarEdicaoRapida() {
    document.querySelectorAll('[data-editar]').forEach((botao) => {
        botao.addEventListener('click', () => {
            const campo = botao.dataset.editar;

            const alvos = {
                nome: nomeUsuario,
                email: emailUsuario,
                telefone: telefoneUsuario,
                idade: dataNascimentoUsuario
            };

            const alvo = alvos[campo];
            if (!alvo) return;

            transformarEmInput(alvo, campo);
        });
    });
}

function transformarEmInput(elemento, campo) {
    const inputExistente = elemento.querySelector('.campo-edicao-inline');

    if (inputExistente) {
        inputExistente.focus();
        return;
    }

    const valorAtual = campo === "idade"
        ? normalizarDataInput(usuarioAtual.data_nascimento)
        : getValorCampoInline(elemento);
    const input = document.createElement('input');

    input.type = campo === "idade" ? 'date' : 'text';
    input.className = 'campo-edicao-inline';
    input.value = valorAtual;

    if (campo !== "idade" && limitesCamposUsuario[campo]) {
        input.maxLength = limitesCamposUsuario[campo];
    }

    if (campo === "idade") {
        input.max = new Date().toISOString().split("T")[0];
    }

    if (campo === "telefone") {
        input.inputMode = "numeric";
        input.pattern = "\\d*";
        input.value = limitarNumeros(valorAtual, limitesCamposUsuario.telefone);
        input.addEventListener("input", () => {
            input.value = limitarNumeros(input.value, limitesCamposUsuario.telefone);
        });
    }

    elemento.textContent = '';
    elemento.appendChild(input);
    input.focus();
    input.select();

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            confirmarInputInline(elemento, input, campo);
        }

        if (event.key === 'Escape') {
            elemento.textContent = campo === "idade" ? formatarDataNascimento(valorAtual) : valorAtual;
        }
    });

    input.addEventListener('blur', () => {
        confirmarInputInline(elemento, input, campo);
    });
}

function confirmarInputInline(elemento, input, campo) {
    if (!elemento.contains(input)) return;

    if (campo === "idade") {
        usuarioAtual.data_nascimento = input.value;
        elemento.textContent = formatarDataNascimento(input.value);
        return;
    }

    if (campo === "telefone") {
        elemento.textContent = limitarNumeros(input.value, limitesCamposUsuario.telefone);
        return;
    }

    const limite = limitesCamposUsuario[campo];
    elemento.textContent = limite ? limitarTexto(input.value, limite) : input.value.trim();
}

function getValorCampoInline(elemento) {
    const input = elemento.querySelector('.campo-edicao-inline');
    return input ? input.value.trim() : elemento.textContent.trim();
}

async function salvarPerfilUsuario(event) {
    event.preventDefault();

    const dados = {
        nome: limitarTexto(getValorCampoInline(nomeUsuario), limitesCamposUsuario.nome),
        email: limitarTexto(getValorCampoInline(emailUsuario), limitesCamposUsuario.email),
        telefone: limitarNumeros(getValorCampoInline(telefoneUsuario), limitesCamposUsuario.telefone),
        dataNascimento: normalizarDataInput(usuarioAtual.data_nascimento),
        nacionalidade: limitarTexto(nacionalidadeUsuario.value, limitesCamposUsuario.nacionalidade),
        escolaridade: limitarTexto(escolaridadeUsuario.value, limitesCamposUsuario.escolaridade),
        formacao: limitarTexto(formacaoUsuario.value, limitesCamposUsuario.formacao),
        idiomas: limitarTexto(idiomasUsuario.value, limitesCamposUsuario.idiomas),
        descricao: limitarTexto(descricaoUsuario.value, limitesCamposUsuario.descricao)
    };

    try {
        const response = await fetch('/api/perfil/usuario', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dados)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarPopup(data.mensagem || "Erro ao atualizar perfil.", "error");
            return;
        }

        mostrarPopup(data.mensagem || "Perfil atualizado com sucesso.", "success");
        setTimeout(() => {
            window.location.href = "/pages/perfil_usuario.html";
        }, 2000);
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        mostrarPopup("Erro ao salvar perfil.", "error");
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
        mostrarPopup("Erro ao carregar perfil.", "error");
    }
}

initEditarUsuario();
