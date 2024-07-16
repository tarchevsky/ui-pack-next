import nodemailer from 'nodemailer'
import { formFields } from '@/components/quiz/formFields'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const formData = req.body

		const transporter = nodemailer.createTransport({
			host: process.env.FORM_HOST,
			port: process.env.FORM_PORT,
			secure: false,
			auth: {
				user: process.env.FORM_USER,
				pass: process.env.FORM_PASS
			}
		})

		try {
			const emailText = formFields
				.map(field => {
					if (field.type === 'radio') {
						const selectedOption = field.options.find(
							option => option.value === formData[field.name]
						)
						return `${field.title}: ${selectedOption ? selectedOption.label : 'Не выбрано'}`
					} else {
						return `${field.placeholder}: ${formData[field.name]}`
					}
				})
				.join('\n')

			await transporter.sendMail({
				from: process.env.FORM_USER,
				to: process.env.FORM_TO,
				subject: `Квиз с сайта ${process.env.SITE_NAME}`,
				text: emailText
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
