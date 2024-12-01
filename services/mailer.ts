import nodeMailer from 'nodemailer'

export const mailer = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3fa264f060e76a",
      pass: '69a40db965f234'
    }
})