# Integra+

<div align="center">

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-2ea44f?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Aiven](https://img.shields.io/badge/Aiven-FF4A00?style=for-the-badge&logo=aiven&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)

**Plataforma web para apoiar a integração social, profissional e informacional de imigrantes no Brasil.**

</div>

---

## 📌 Sobre

O **Integra+** é uma aplicação web desenvolvida para centralizar informações e serviços essenciais para imigrantes sul-americanos em situação de vulnerabilidade social no Brasil.

A plataforma conecta usuários a **oportunidades de trabalho**, **empresas cadastradas**, **informações de regularização documental** e **unidades de saúde**, reduzindo barreiras de acesso à informação e apoiando a inclusão social.

O projeto foi concebido como um MVP acadêmico com foco em impacto social, acessibilidade e organização de dados relevantes para o público imigrante.

---

## 🎯 ODS da ONU atendidas

De acordo com a proposta inicial do projeto, o Integra+ está alinhado aos seguintes **Objetivos de Desenvolvimento Sustentável da ONU**:

| ODS | Nome | Relação com o projeto |
| --- | --- | --- |
| **ODS 3** | Saúde e Bem-estar | Facilita o acesso a informações sobre unidades de saúde e serviços públicos de atendimento. |
| **ODS 8** | Trabalho Decente e Crescimento Econômico | Aproxima imigrantes de oportunidades de emprego e empresas que divulgam vagas. |
| **ODS 10** | Redução das Desigualdades | Apoia a inclusão social de imigrantes por meio de informação acessível e organizada. |

---

## ✨ Funcionalidades principais

- Cadastro e autenticação de usuários.
- Cadastro e autenticação de empresas.
- Publicação, edição e exclusão de vagas por empresas.
- Listagem e busca de vagas disponíveis.
- Visualização detalhada de vagas.
- Favoritar vagas.
- Marcar vagas como enviadas/candidatadas.
- Perfil do usuário com dados pessoais e profissionais.
- Perfil da empresa com dados institucionais.
- Upload e exibição de avatar.
- Busca de unidades de saúde por localização ou cidade.
- Controle de acesso por tipo de usuário: `usuario` e `empresa`.
- Consumo de API própria via rotas `/api`.

---

## 🧰 Tecnologias utilizadas

| Camada | Tecnologias |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Banco de dados | MySQL |
| Autenticação | JWT, bcrypt |
| Deploy frontend e backend | Netlify |
| Banco em nuvem | Aiven for MySQL |
| Testes | Node Test Runner (`node:test`) |
| Versionamento | Git e GitHub |

---

## 🗂️ Estrutura de pastas

```text
Integra+
├── database/
│   └── backup/
│       └── Dump20260504.sql
├── docs/
│   ├── Proposta Inicial  - 1º Entrega.pdf
│   ├── 2° entrega Integra+.pdf
│   └── Modelo ENTIDADE-RELACIONAMENTO Integra+ .pdf
├── src/
│   ├── app.js
│   ├── backend/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   └── frontend/
│       ├── assets/
│       ├── pages/
│       ├── scripts/
│       ├── styles/
│       └── index.html
├── tests/
├── uploads/
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## 🏗️ Arquitetura

O Integra+ segue uma arquitetura web tradicional em camadas, separando responsabilidades entre interface, API, regras de negócio e persistência de dados.

```text
Usuário / Empresa
      │
      ▼
Frontend estático
HTML + CSS + JavaScript
      │
      ▼
API REST
Node.js + Express
      │
      ▼
Controllers
Regras de entrada, validação e resposta HTTP
      │
      ▼
Models
Consultas SQL e acesso aos dados
      │
      ▼
MySQL
Banco gerenciado na Aiven
```

### Camadas do backend

| Camada | Responsabilidade |
| --- | --- |
| `routes` | Define os endpoints da API e aplica middlewares. |
| `middlewares` | Valida autenticação JWT e permissões por tipo de usuário. |
| `controllers` | Processa requisições, valida dados e define respostas. |
| `models` | Executa consultas SQL e comunica com o MySQL. |
| `config` | Centraliza a configuração de conexão com banco de dados. |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Banco MySQL configurado localmente ou na Aiven.
- Arquivo `.env` criado na raiz do projeto.

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse a pasta do projeto
cd Integra+

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie a aplicação
npm start
```

Após iniciar o servidor, acesse:

```text
http://localhost:3000
```

Para ambiente de desenvolvimento com reinício automático:

```bash
npm run dev
```

Para executar os testes:

```bash
npm test
```

---

## 🔐 Configuração do `.env`

Crie um arquivo chamado `.env` na raiz do projeto com as configurações do servidor, autenticação e banco de dados.

### `.env.example`

```env
# Servidor
PORT=3000

# Autenticacao
JWT_SECRET=sua_chave_secreta_jwt

# Banco de dados MySQL
DB_HOST=seu-host-mysql.aivencloud.com
DB_PORT=00000
DB_USER=avnadmin
DB_PASSWORD=sua_senha_do_banco
DB_NAME=integraplus
```

> Nunca envie o arquivo `.env` real para o GitHub. Publique apenas o `.env.example`.

---

## 🌱 Variáveis de ambiente

| Variável | Obrigatória | Descrição | Exemplo |
| --- | --- | --- | --- |
| `PORT` | Não | Porta local da aplicação. | `3000` |
| `JWT_SECRET` | Sim | Chave usada para assinar e validar tokens JWT. | `minha_chave_segura` |
| `DB_HOST` | Sim | Host do banco MySQL. | `mysql-aiven.aivencloud.com` |
| `DB_PORT` | Sim | Porta do banco MySQL. | `25060` |
| `DB_USER` | Sim | Usuário do banco de dados. | `avnadmin` |
| `DB_PASSWORD` | Sim | Senha do banco de dados. | `********` |
| `DB_NAME` | Sim | Nome do banco utilizado pela aplicação. | `integraplus` |

---

## ☁️ Deploy

### Frontend e backend na Netlify

O **frontend** e o **backend/API** do Integra+ podem ser hospedados na **Netlify**, uma plataforma moderna de deploy, hospedagem e entrega de aplicações web.

No projeto, a Netlify fica responsável por disponibilizar a interface web e expor as rotas da aplicação para consumo pelo frontend. Como o backend é desenvolvido em Node.js/Express, a publicação em produção deve considerar uma configuração compatível com ambiente serverless ou funções da Netlify, mantendo a API acessível pelas rotas `/api`.

Configuração sugerida:

| Campo | Valor |
| --- | --- |
| Build command | vazio ou não configurado |
| Publish directory | `src/frontend` |
| Production branch | `main` |

Como os scripts do frontend utilizam rotas relativas, como `/api/login`, frontend e backend podem operar no mesmo domínio publicado pela Netlify.

Exemplo conceitual de roteamento para manter a API sob `/api`:

```text
/api/* /.netlify/functions/api/:splat 200
```

> A configuração exata pode variar conforme a estratégia escolhida para adaptar o Express à Netlify Functions.

### Banco MySQL na Aiven

O banco de dados é hospedado na **Aiven**, uma plataforma de banco de dados em nuvem gerenciado.

Neste projeto, a Aiven fornece um serviço **MySQL gerenciado**, cuidando de infraestrutura, disponibilidade, conexão segura e gerenciamento do banco. A aplicação backend se conecta ao banco usando as variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`.

---

## 🔌 Endpoints principais da API

### Autenticação

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/api/login` | Público | Realiza login de usuário ou empresa. |
| `GET` | `/api/protected` | Autenticado | Retorna dados do usuário autenticado pelo token. |

### Cadastro

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/api/cadastro/usuario` | Público | Cadastra um novo usuário. |
| `POST` | `/api/cadastro/empresa` | Público | Cadastra uma nova empresa. |

### Vagas

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/api/vagaAll` | Público | Lista todas as vagas. |
| `GET` | `/api/vagaAll?busca=termo` | Público | Busca vagas por termo. |
| `GET` | `/api/vagaById?id=1` | Público | Retorna os detalhes de uma vaga. |
| `GET` | `/api/vaga?id=1,2,3` | Público | Busca vagas por lista de IDs. |
| `GET` | `/api/Vagasempresa` | Empresa | Lista vagas cadastradas pela empresa autenticada. |
| `POST` | `/api/vaga` | Empresa | Cria uma nova vaga. |
| `PUT` | `/api/vaga` | Empresa | Edita uma vaga da empresa autenticada. |
| `DELETE` | `/api/vaga/:id` | Empresa | Exclui uma vaga da empresa autenticada. |

### Perfil e avatar

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/api/usuario` | Usuário | Retorna dados do perfil do usuário. |
| `GET` | `/api/empresa` | Empresa | Retorna dados do perfil da empresa. |
| `PUT` | `/api/perfil/usuario` | Usuário | Atualiza o perfil do usuário. |
| `PUT` | `/api/perfil/empresa` | Empresa | Atualiza o perfil da empresa. |
| `GET` | `/api/avatar` | Autenticado | Retorna avatar do usuário ou empresa. |
| `POST` | `/api/avatar` | Autenticado | Atualiza avatar em Base64. |

### Favoritos e candidaturas

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `POST` | `/api/favoritar` | Usuário | Favorita uma vaga. |
| `DELETE` | `/api/favoritar` | Usuário | Remove uma vaga dos favoritos. |
| `POST` | `/api/marcar` | Usuário | Marca uma vaga como enviada. |
| `DELETE` | `/api/marcar` | Usuário | Remove marcação de vaga enviada. |
| `GET` | `/api/vagasFavoritadas` | Usuário | Lista IDs das vagas favoritadas. |
| `GET` | `/api/vagasEnviadas` | Usuário | Lista IDs das vagas enviadas. |
| `GET` | `/api/verificaSeFavorita?ID_vaga=1` | Usuário | Verifica se uma vaga está favoritada. |
| `GET` | `/api/verificaSeEnviado?ID_vaga=1` | Usuário | Verifica se uma vaga foi marcada como enviada. |

### Saúde

| Método | Endpoint | Acesso | Descrição |
| --- | --- | --- | --- |
| `GET` | `/api/unidades?lat=-23&lng=-46` | Público | Busca unidades de saúde próximas. |
| `GET` | `/api/unidades?cidade=Sao%20Paulo` | Público | Busca unidades de saúde por cidade. |

---

## 🖼️ Screenshots

> Substitua os placeholders abaixo por imagens reais da aplicação quando disponíveis.

| Tela | Preview |
| --- | --- |
| Página inicial | ![Página inicial](docs/screenshots/home.png) |
| Login | ![Login](docs/screenshots/login.png) |
| Listagem de vagas | ![Vagas](docs/screenshots/vagas.png) |
| Perfil do usuário | ![Perfil do usuário](docs/screenshots/perfil-usuario.png) |
| Painel da empresa | ![Painel da empresa](docs/screenshots/painel-empresa.png) |

---

## 🧪 Testes

O projeto possui testes automatizados com o runner nativo do Node.js.

```bash
npm test
```

A suíte cobre autenticação, middlewares, controllers, models, contratos de rotas, URLs do frontend e validações estruturais de páginas e scripts.

---

## 🛣️ Melhorias futuras

- Internacionalização completa da interface para espanhol.
- Fluxo real de candidatura com histórico e status.
- Notificações para usuários e empresas.
- Painel administrativo para moderação de vagas.
- Testes end-to-end com navegador.
- Pipeline CI/CD com execução automática dos testes.
- Dashboard de métricas de vagas, acessos e candidaturas.
- Melhorias de acessibilidade seguindo WCAG.
- Integração com serviços oficiais de documentação migratória.

---

## 👥 Equipe

| Integrante | RA |
| --- | --- |
| Felipe Natali Amaral | 24792566 |
| José Ricardo Padovan Ferreira | 24010692 |
| Pedro Pimentel Rodrigues | 24023362 |
| Pedro Guimarães Peruchi | 24019888 |
| Thiago Aureliano Lança Rodriguez | 25004196 |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina **Projeto e Implementação de Aplicativos**.

---

<div align="center">

**Integra+**  
Tecnologia como ponte para inclusão, trabalho digno e acesso à informação.

</div>
