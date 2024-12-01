import { mailer } from '../../services/mailer'

export default defineEventHandler(async (event) => {
  // const { sendMail } = useNodeMailer()
  const info = await mailer.sendMail({
    from: 'info@chalaan.com',
    to: 'jjanaks12@gmail.com',
    subject: 'test mail',
    html: `
    <h1>Hello world</h1>
    `
  })

  return {
    status: 'success',
    message: info.messageId
  }
})
