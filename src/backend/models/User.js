const users = [
  {
    id: 1,
    email: "teste1@email.com",
    password: "$2b$10$JFBwCXl0VmTYvkUiGOYZ3.GH5a7QPX9KGgdU3xScuTxzF1PtR3VGa",
    nome:"joao"
  },
    {
    id: 2,
    email: "teste2@email.com",
    password: "$2b$10$JFBwCXl0VmTYvkUiGOYZ3.GH5a7QPX9KGgdU3xScuTxzF1PtR3VGa",
    nome:"maria"
  },
    {
    id: 3,
    email: "teste3@email.com",
    password: "$2b$10$JFBwCXl0VmTYvkUiGOYZ3.GH5a7QPX9KGgdU3xScuTxzF1PtR3VGa",
    nome:"silva"
  }
];


const Empresa = [
  {
    id: 1,
    email: "empresa1@email.com",
    password: "$2b$10$JFBwCXl0VmTYvkUiGOYZ3.GH5a7QPX9KGgdU3xScuTxzF1PtR3VGa",
    nome:"lk1"
  },
    {
    id: 2,
    email: "empresa2@email.com",
    password: "$2b$10$JFBwCXl0VmTYvkUiGOYZ3.GH5a7QPX9KGgdU3xScuTxzF1PtR3VGa",
    nome:"sks"
  },
    {
    id: 3,
    email: "empresa3@email.com",
    password: "$2b$10$JFBwCXl0VmTYvkUiGOYZ3.GH5a7QPX9KGgdU3xScuTxzF1PtR3VGa",
    nome:"vcx"
  }
];

exports.findByEmail = async (email) => {
  return users.find(user => user.email === email);
};