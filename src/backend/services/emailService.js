const nodemailer = require('nodemailer')

const criarTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Credenciais de email nao configuradas.')
  }

  const smtpPort = Number(process.env.SMTP_PORT || 587)

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort !== 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS.replace(/\s/g, '')
    },
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 15000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 10000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 20000)
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
