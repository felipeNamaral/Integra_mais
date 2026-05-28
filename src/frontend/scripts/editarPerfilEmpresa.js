const token = localStorage.getItem('token');
const avatarPadrao = "/assets/img/user.png";

const nomeHeader = document.getElementById('nome');
const nomeEmpresa = document.getElementById('nomeEmpresaEditar');
const cnpjEmpresa = document.getElementById('cnpj');
const emailEmpresa = document.getElementById('emailEmpresaEditar');
const telefoneEmpresa = document.getElementById('telefoneEmpresaEditar');
const enderecoEmpresa = document.getElementById('enderecoEmpresaEditar');
const descricaoEmpresa = document.getElementById('descricaoEmpresa');
const formEditarEmpresa = document.getElementById('formEditarEmpresa');
const btnEditarAvatar = document.getElementById('btnEditarAvatar');
const inputAvatar = document.getElementById('inputAvatar');

let empresaAtual = {};

const limitesCamposEmpresa = {
    nome: 100,
    cnpj: 14,
    email: 100,
    telefone: 15,
    endereco: 150,
    descricao: 500
};

function limitarNumeros(valor, limite) {
    return String(valor || "").replace(/\D/g, "").slice(0, limite);
}

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
                body: JSON.stringify({
                    imagem,
                    cnpj: getValorCampoInline(cnpjEmpresa)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                mostrarPopup(data.message || "Erro ao enviar avatar.", "error");
                return;
            }

            aplicarAvatarNaTela(data.avatar);
            empresaAtual.avatar = data.avatar;
        } catch (error) {
            console.error('Erro ao enviar avatar:', error);
            mostrarPopup("Erro ao enviar avatar.", "error");
        } finally {
            inputAvatar.value = "";
        }
    });
}

async function carregarDadosEmpresa() {
    const response = await fetch('/api/empresa', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    empresaAtual = await response.json();

    nomeEmpresa.textContent = empresaAtual.nome || "";
    cnpjEmpresa.textContent = empresaAtual.cnpj || "";
    emailEmpresa.textContent = empresaAtual.email || "";
    telefoneEmpresa.textContent = empresaAtual.telefone || "";
    enderecoEmpresa.textContent = empresaAtual.endereco || "";
    descricaoEmpresa.value = empresaAtual.descricao || "";
}

function configurarEdicaoRapida() {
    document.querySelectorAll('[data-editar]').forEach((botao) => {
        botao.addEventListener('click', () => {
            const campo = botao.dataset.editar;
            const alvos = {
                nome: nomeEmpresa,
                cnpj: cnpjEmpresa,
                email: emailEmpresa,
                telefone: telefoneEmpresa,
                endereco: enderecoEmpresa
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
    const campo = Object.entries({
        nome: nomeEmpresa,
        cnpj: cnpjEmpresa,
        email: emailEmpresa,
        telefone: telefoneEmpresa,
        endereco: enderecoEmpresa
    }).find(([, alvo]) => alvo === elemento)?.[0];
    const input = document.createElement('input');

    input.type = 'text';
    input.className = 'campo-edicao-inline';
    input.value = valorAtual;

    if (campo && limitesCamposEmpresa[campo]) {
        input.maxLength = limitesCamposEmpresa[campo];
    }

    if (campo === "telefone") {
        input.inputMode = "numeric";
        input.pattern = "\\d*";
        input.value = limitarNumeros(valorAtual, limitesCamposEmpresa.telefone);
        input.addEventListener("input", () => {
            input.value = limitarNumeros(input.value, limitesCamposEmpresa.telefone);
        });
    }

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

    const campo = Object.entries({
        nome: nomeEmpresa,
        cnpj: cnpjEmpresa,
        email: emailEmpresa,
        telefone: telefoneEmpresa,
        endereco: enderecoEmpresa
    }).find(([, alvo]) => alvo === elemento)?.[0];
    const limite = campo ? limitesCamposEmpresa[campo] : null;

    if (campo === "telefone") {
        elemento.textContent = limitarNumeros(input.value, limitesCamposEmpresa.telefone);
        return;
    }

    elemento.textContent = limite
        ? input.value.trim().slice(0, limite)
        : input.value.trim();
}

function getValorCampoInline(elemento) {
    const input = elemento.querySelector('.campo-edicao-inline');
    return input ? input.value.trim() : elemento.textContent.trim();
}

async function salvarPerfilEmpresa(event) {
    event.preventDefault();

    const dados = {
        nomeEmpresa: getValorCampoInline(nomeEmpresa).slice(0, limitesCamposEmpresa.nome),
        cnpj: getValorCampoInline(cnpjEmpresa).slice(0, limitesCamposEmpresa.cnpj),
        email: getValorCampoInline(emailEmpresa).slice(0, limitesCamposEmpresa.email),
        telefone: limitarNumeros(getValorCampoInline(telefoneEmpresa), limitesCamposEmpresa.telefone),
        endereco: getValorCampoInline(enderecoEmpresa).slice(0, limitesCamposEmpresa.endereco),
        descricao: descricaoEmpresa.value.trim().slice(0, limitesCamposEmpresa.descricao)
    };

    try {
        const response = await fetch('/api/perfil/empresa', {
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
            window.location.href = "/pages/perfil_empresa.html";
        }, 2000);
    } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        mostrarPopup("Erro ao salvar perfil.", "error");
    }
}

async function initEditarEmpresa() {
    try {
        await carregarAutenticacao();
        await carregarDadosEmpresa();
        configurarEdicaoRapida();
        configurarUploadAvatar();
        formEditarEmpresa.addEventListener('submit', salvarPerfilEmpresa);
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        mostrarPopup("Erro ao carregar perfil.", "error");
    }
}

initEditarEmpresa();
