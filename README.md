# Integra+

<div align="center">

![Status](https://img.shields.io/badge/status-deploy%20ativo-2ea44f?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Aiven](https://img.shields.io/badge/Aiven-FF4A00?style=for-the-badge&logo=aiven&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=000)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)

**Plataforma web para apoiar a integracao social, profissional e informacional de imigrantes no Brasil.**

</div>

---

## Sobre

O **Integra+** e uma aplicacao web desenvolvida para centralizar informacoes e servicos essenciais para imigrantes sul-americanos em situacao de vulnerabilidade social no Brasil.

A plataforma conecta usuarios a oportunidades de trabalho, empresas cadastradas, informacoes de regularizacao documental e unidades de saude, reduzindo barreiras de acesso a informacao e apoiando a inclusao social.

O projeto foi concebido como um MVP academico com foco em impacto social, acessibilidade e organizacao de dados relevantes para o publico imigrante.

Aplicacao em producao: https://integra-mais-kjge.onrender.com

---

## ODS da ONU atendidas

| ODS | Nome | Relacao com o projeto |
| --- | --- | --- |
| ODS 3 | Saude e Bem-estar | Facilita o acesso a informacoes sobre unidades de saude e servicos publicos de atendimento. |
| ODS 8 | Trabalho Decente e Crescimento Economico | Aproxima imigrantes de oportunidades de emprego e empresas que divulgam vagas. |
| ODS 10 | Reducao das Desigualdades | Apoia a inclusao social de imigrantes por meio de informacao acessivel e organizada. |

---

## Funcionalidades principais

- Cadastro e autenticacao de usuarios.
- Cadastro e autenticacao de empresas.
- Recuperacao de senha para usuarios e empresas por link enviado por e-mail.
- Tokens de recuperacao com expiracao de 15 minutos gerada pelo MySQL.
- Tela de recuperacao com validacao de e-mail e confirmacao "Verifique seu email".
- Publicacao, edicao e exclusao de vagas por empresas.
- Listagem, busca e visualizacao detalhada de vagas.
- Favoritar vagas.
- Marcar vagas como enviadas/candidatadas.
- Perfil do usuario com dados pessoais e profissionais.
- Perfil da empresa com dados institucionais.
- Upload e exibicao de avatar.
- Busca de unidades de saude por localizacao ou cidade.
- Controle de acesso por tipo de usuario: `usuario` e `empresa`.
- Troca de idioma em telas principais, incluindo login e recuperacao de senha.
- Consumo de API propria via rotas `/api`.

---

## Tecnologias utilizadas

| Camada | Tecnologias |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Banco de dados | MySQL |
| Autenticacao | JWT, bcrypt |
| E-mail | Nodemailer, SMTP Gmail |
| Banco em nuvem | Aiven for MySQL |
| Hospedagem | Render |
| Armazenamento de imagens | Cloudinary |
| Testes | Node Test Runner (`node:test`) |
| Versionamento | Git e GitHub |

---

## Estrutura de pastas

```text
Integra+
|-- database/
|   `-- backup/
|-- docs/
|-- src/
|   |-- app.js
|   |-- backend/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- services/
|   `-- frontend/
|       |-- assets/
|       |-- pages/
|       |-- scripts/
|       `-- styles/
|-- tests/
|-- uploads/
|-- package.json
|-- package-lock.json
|-- server.js
`-- README.md
```

---

## Arquitetura

O Integra+ segue uma arquitetura web em camadas, separando interface, API, regras de entrada e persistencia de dados.

```text
Usuario / Empresa
      |
      v
Frontend estatico
HTML + CSS + JavaScript
      |
      v
API REST
Node.js + Express
      |
      v
Controllers
Validacao e resposta HTTP
      |
      v
Models e Services
SQL, banco de dados e envio de e-mail
      |
      v
MySQL / SMTP
```

| Camada | Responsabilidade |
| --- | --- |
| `routes` | Define endpoints da API e aplica middlewares. |
| `middlewares` | Valida autenticacao JWT e permissoes por tipo de usuario. |
| `controllers` | Processa requisicoes, valida dados e define respostas. |
| `models` | Executa consultas SQL e comunica com o MySQL. |
| `services` | Centraliza servicos externos, como envio de e-mail. |
| `config` | Centraliza configuracoes de conexao com banco. |

---

## Como rodar localmente

### Pre-requisitos

- Node.js instalado.
- npm instalado.
- Banco MySQL configurado localmente ou na Aiven.
- Arquivo `.env` criado na raiz do projeto.
- Conta Gmail com senha de app para envio de e-mails de recuperacao.

### Passo a passo

```bash
# Instale as dependencias
npm install

# Configure as variaveis de ambiente
cp .env.example .env

# Inicie a aplicacao
npm start
```

Acesse:

```text
http://localhost:3000
```

Para desenvolvimento com reinicio automatico:

```bash
npm run dev
```

Para executar os testes:

```bash
npm test
```

---

## Configuracao do `.env`

Crie um arquivo chamado `.env` na raiz do projeto com as configuracoes do servidor, banco, JWT e envio de e-mail.

```env
# Servidor
PORT=3000
APP_URL=http://localhost:3000

# Autenticacao
JWT_SECRET=sua_chave_secreta_jwt

# Banco de dados MySQL
DB_HOST=seu-host-mysql.aivencloud.com
DB_PORT=00000
DB_USER=avnadmin
DB_PASSWORD=sua_senha_do_banco
DB_NAME=integraplus

# E-mail de recuperacao de senha
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_gmail

# Cloudinary
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

> Nunca envie o arquivo `.env` real para o GitHub. Publique apenas um `.env.example`.

### Variaveis de ambiente

| Variavel | Obrigatoria | Descricao | Exemplo |
| --- | --- | --- | --- |
| `PORT` | Nao | Porta local da aplicacao. | `3000` |
| `APP_URL` | Sim | URL base usada para montar o link de redefinicao de senha. | `http://localhost:3000` |
| `JWT_SECRET` | Sim | Chave usada para assinar e validar tokens JWT. | `minha_chave_segura` |
| `DB_HOST` | Sim | Host do banco MySQL. | `mysql-aiven.aivencloud.com` |
| `DB_PORT` | Sim | Porta do banco MySQL. | `25060` |
| `DB_USER` | Sim | Usuario do banco de dados. | `avnadmin` |
| `DB_PASSWORD` | Sim | Senha do banco de dados. | `********` |
| `DB_NAME` | Sim | Nome do banco utilizado pela aplicacao. | `integraplus` |
| `EMAIL_USER` | Sim | Conta usada para enviar e-mails de recuperacao. | `integramais.app@gmail.com` |
| `EMAIL_PASS` | Sim | Senha de app do Gmail usada pelo Nodemailer. | `********` |
| `CLOUDINARY_CLOUD_NAME` | Sim | Nome da cloud usada para armazenar imagens. | `integra-mais` |
| `CLOUDINARY_API_KEY` | Sim | Chave da API do Cloudinary. | `123456789000000` |
| `CLOUDINARY_API_SECRET` | Sim | Segredo da API do Cloudinary. | `********` |

> Para Gmail, use uma senha de app. A senha normal da conta nao deve ser usada no projeto.

---


## Endpoints principais da API

### Autenticacao

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `POST` | `/api/login` | Publico | Realiza login de usuario ou empresa. |
| `GET` | `/api/protected` | Autenticado | Retorna dados do usuario autenticado pelo token. |

### Recuperacao de senha

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `POST` | `/api/recuperar-senha` | Publico | Gera token e envia link por e-mail para usuario ou empresa. |
| `PUT` | `/api/redefinir-senha` | Publico | Valida token e redefine a senha com hash bcrypt. |

Fluxo atual:

1. Usuario informa o e-mail em `recuperar.html`.
2. Backend procura o e-mail em `usuario` e `empresa`.
3. Se existir, grava `reset_token` e `reset_token_expira`.
4. Backend envia link para `novaSenha.html?token=...`.
5. Nova senha e salva com `bcrypt`.
6. Token e expiracao sao limpos apos o uso.

### Cadastro

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `POST` | `/api/cadastro/usuario` | Publico | Cadastra um novo usuario. |
| `POST` | `/api/cadastro/empresa` | Publico | Cadastra uma nova empresa. |

### Vagas

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `GET` | `/api/vagaAll` | Publico | Lista todas as vagas. |
| `GET` | `/api/vagaAll?busca=termo` | Publico | Busca vagas por termo. |
| `GET` | `/api/vagaById?id=1` | Publico | Retorna os detalhes de uma vaga. |
| `GET` | `/api/vaga?id=1,2,3` | Publico | Busca vagas por lista de IDs. |
| `GET` | `/api/Vagasempresa` | Empresa | Lista vagas cadastradas pela empresa autenticada. |
| `POST` | `/api/vaga` | Empresa | Cria uma nova vaga. |
| `PUT` | `/api/vaga` | Empresa | Edita uma vaga da empresa autenticada. |
| `DELETE` | `/api/vaga/:id` | Empresa | Exclui uma vaga da empresa autenticada. |

### Perfil e avatar

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `GET` | `/api/usuario` | Usuario | Retorna dados do perfil do usuario. |
| `GET` | `/api/empresa` | Empresa | Retorna dados do perfil da empresa. |
| `PUT` | `/api/perfil/usuario` | Usuario | Atualiza o perfil do usuario. |
| `PUT` | `/api/perfil/empresa` | Empresa | Atualiza o perfil da empresa. |
| `GET` | `/api/avatar` | Autenticado | Retorna avatar do usuario ou empresa. |
| `POST` | `/api/avatar` | Autenticado | Atualiza avatar em Base64. |

### Favoritos e candidaturas

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `POST` | `/api/favoritar` | Usuario | Favorita uma vaga. |
| `DELETE` | `/api/favoritar` | Usuario | Remove uma vaga dos favoritos. |
| `POST` | `/api/marcar` | Usuario | Marca uma vaga como enviada. |
| `DELETE` | `/api/marcar` | Usuario | Remove marcacao de vaga enviada. |
| `GET` | `/api/vagasFavoritadas` | Usuario | Lista IDs das vagas favoritadas. |
| `GET` | `/api/vagasEnviadas` | Usuario | Lista IDs das vagas enviadas. |
| `GET` | `/api/verificaSeFavorita?ID_vaga=1` | Usuario | Verifica se uma vaga esta favoritada. |
| `GET` | `/api/verificaSeEnviado?ID_vaga=1` | Usuario | Verifica se uma vaga foi marcada como enviada. |

### Saude

| Metodo | Endpoint | Acesso | Descricao |
| --- | --- | --- | --- |
| `GET` | `/api/unidades?lat=-23&lng=-46` | Publico | Busca unidades de saude proximas. |
| `GET` | `/api/unidades?cidade=Sao%20Paulo` | Publico | Busca unidades de saude por cidade. |
| `GET` | `/api/unidades/favoritas` | Usuario | Lista unidades de saude favoritadas. |
| `GET` | `/api/unidades/favorita` | Usuario | Verifica se uma unidade esta favoritada. |
| `POST` | `/api/unidades/favorita` | Usuario | Favorita uma unidade de saude. |
| `DELETE` | `/api/unidades/favorita` | Usuario | Remove unidade dos favoritos. |

---

## Testes

O projeto possui testes automatizados com o runner nativo do Node.js.

```bash
npm test
```

A suite cobre autenticacao, recuperacao de senha, envio de e-mail mockado, middlewares, controllers, models, contratos de rotas, URLs do frontend e validacoes estruturais de paginas e scripts.

Status atual verificado: `30/30` testes passando.

---

## Deploy

O deploy final do projeto foi realizado no Render, com frontend e backend publicados juntos na mesma aplicacao web.

URL de producao:

```text
https://integra-mais-kjge.onrender.com
```

O frontend consome a API por rotas relativas, como `/api/login`, permitindo que interface e backend funcionem sob o mesmo dominio em producao.

Servicos utilizados no deploy:

| Servico | Uso no projeto |
| --- | --- |
| Render | Hospedagem do frontend estatico e da API Node.js/Express. |
| Aiven for MySQL | Banco de dados MySQL em nuvem. |
| Cloudinary | Armazenamento e entrega das imagens de avatar dos usuarios e empresas. |
| Gmail SMTP | Envio dos e-mails de recuperacao de senha. |

Variaveis principais configuradas em producao:

- `APP_URL=https://integra-mais-kjge.onrender.com`
- credenciais do banco Aiven;
- `JWT_SECRET` seguro;
- `EMAIL_USER` e `EMAIL_PASS` para recuperacao de senha;
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` e `CLOUDINARY_API_SECRET` para upload das imagens.

---

## Melhorias futuras

- Ampliar a internacionalizacao completa da interface para espanhol.
- Melhorar entregabilidade dos e-mails com dominio proprio e SPF/DKIM/DMARC.
- Fluxo real de candidatura com historico e status.
- Notificacoes para usuarios e empresas.
- Painel administrativo para moderacao de vagas.
- Testes end-to-end com navegador.
- Pipeline CI/CD com execucao automatica dos testes.
- Dashboard de metricas de vagas, acessos e candidaturas.
- Melhorias de acessibilidade seguindo WCAG.
- Integracao com servicos oficiais de documentacao migratoria.

---

## Equipe

| Integrante | RA |
| --- | --- |
| Felipe Natali Amaral | 24792566 |
| Jose Ricardo Padovan Ferreira | 24010692 |
| Pedro Pimentel Rodrigues | 24023362 |
| Pedro Guimaraes Peruchi | 24019888 |
| Thiago Aureliano Lanca Rodriguez | 25004196 |

---

## Licenca

Este projeto foi desenvolvido para fins academicos na disciplina **Projeto e Implementacao de Aplicativos**.

---

<div align="center">

**Integra+**  
Tecnologia como ponte para inclusao, trabalho digno e acesso a informacao.

</div>
