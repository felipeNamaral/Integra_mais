const token = localStorage.getItem('token');
const nome = document.getElementById('nome');
const avatarPadrao = "/assets/img/user.png";

async function carregar() {
  const response = await fetch('/api/protected', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  nome.textContent = `${data.nome}`;
  await carregarAvatar();
}

carregar();

async function carregarAvatar() {
  try {
    const response = await fetch('/api/avatar', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    const avatar = data.avatar || avatarPadrao;
    const imagensAvatar = document.querySelectorAll('img[src="/assets/img/user.png"], img#avatar');

    imagensAvatar.forEach((imagem) => {
      imagem.src = avatar;
      imagem.onerror = () => {
        imagem.src = avatarPadrao;
      };
    });
  } catch (error) {
    console.error('Erro ao carregar avatar:', error);
  }
}


const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    document.querySelectorAll(".accordion-content").forEach(c => {
      if (c !== content) {
        c.style.maxHeight = null;
        c.classList.remove("open");
      }
    });

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("open");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
    }
  });
});
