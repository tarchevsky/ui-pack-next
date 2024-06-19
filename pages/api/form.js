import nodemailer from 'nodemailer'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { name, email, phone, message } = req.body

		const transporter = nodemailer.createTransport({
			host: process.env.FORM_HOST,
			port: process.env.FORM_PORT,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.FORM_USER,
				pass: process.env.FORM_PASS
			}
		})

		try {
			await transporter.sendMail({
				from: process.env.FORM_USER,
				to: process.env.FORM_TO,
				subject: `Заявка с сайта`,
				text: `Имя: ${name}\nПочта: ${email}\nТелефон: ${phone}\nСообщение: ${message}`
			})
			res.status(200).json({ success: true })
		} catch (error) {
			console.error(error)
			res.status(500).json({ success: false, error: error.message })
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
