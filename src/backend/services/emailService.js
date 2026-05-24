const nodemailer = require('nodemailer')

const criarTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Credenciais de email nao configuradas.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
}

const enviarEmailRecuperacaoSenha = async (destinatario, link) => {
  const transporter = criarTransporter()

  await transporter.sendMail({
    from: `"Integra+" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Recuperacao de senha - Integra+',
    html: `
      <p>Ola,</p>
      <p>Recebemos uma solicitacao para redefinir sua senha no Integra+.</p>
      <p><a href="${link}">Clique aqui para criar uma nova senha</a></p>
      <p>Este link expira em 1 hora. Se voce nao solicitou a recuperacao, ignore este email.</p>
    `
  })
}

module.exports = {
  enviarEmailRecuperacaoSenha
}
