import { formFields } from '@/components/quiz/formFields'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const formData = req.body

		console.log('Received form data:', formData)

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
			const formDataObj = {}
			if (formData instanceof FormData) {
				for (let [key, value] of formData.entries()) {
					formDataObj[key] = value
				}
			} else {
				Object.assign(formDataObj, formData)
			}

			// Подготавливаем вложения, если есть файл
			const attachments = []
			if (formDataObj.resume && formDataObj.resume.data) {
				attachments.push({
					filename: formDataObj.resume.name,
					content: Buffer.from(formDataObj.resume.data.split(',')[1], 'base64')
				})
			}

			const emailText = formFields
				.map(field => {
					const value = formDataObj[field.name]

					console.log(`Processing field ${field.name}:`, value)

					if (!value && value !== 0) return null

					switch (field.type) {
						case 'file':
							if (formDataObj.resume && formDataObj.resume.data) {
								return `${field.title}: Файл прикреплён (${formDataObj.resume.name})`
							} else {
								return `${field.title}: Пользователь файл не прикреплял`
							}
						case 'radio':
							const selectedOption = field.options?.find(
								option => option.value === value
							)
							return `${field.title}: ${selectedOption ? selectedOption.label : 'Не выбрано'}`

						case 'checkbox':
							if (Array.isArray(value)) {
								const selectedLabels = field.options
									?.filter(option => value.includes(option.value))
									.map(option => option.label)
								return `${field.title}: ${selectedLabels?.join(', ') || 'Не выбрано'}`
							}
							return null

						default:
							const fieldTitle = field.title || field.placeholder || field.name
							return `${fieldTitle}: ${value}`
					}
				})
				.filter(Boolean)
				.join('\n')

			if (!emailText.trim()) {
				throw new Error('Форма не содержит данных')
			}

			await transporter.sendMail({
				from: process.env.FORM_USER,
				to: process.env.FORM_TO,
				subject: `Заявка с сайта ${process.env.SITE_NAME}`,
				text: emailText,
				attachments: attachments
			})
			res.status(200).json({ success: true })
		} catch (error) {
			console.error('Error processing form:', error)
			res.status(500).json({
				success: false,
				error: error.message,
				details: 'Проверьте заполнение всех обязательных полей'
			})
		}
	} else {
		res.status(405).json({ success: false, message: 'Method not allowed' })
	}
}
