import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
    },
})

export async function sendEmail(to, subject, content) {
    console.log(`process.env.EMAIL_HOST`, process.env.EMAIL_HOST)
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER, // Người gửi
        to, // Người nhận
        subject, // Chủ đề
        text: content, // Nội dung dạng text
    })
    console.log(`✅ Email sent: ${to}`, info.messageId)
}
