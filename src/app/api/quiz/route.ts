import { formFields } from '@/components/quiz/formFields'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface FileData {
	name: string
	data: string
	type: string
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json()

		const formatQuizData = (data: Record<string, any>) => {
			const fieldDefinitions = formFields.reduce(
				(acc, field) => {
					acc[field.name] = field
					return acc
				},
				{} as Record<string, any>
			)

			return Object.entries(data)
				.map(([key, value]) => {
					const fieldDef = fieldDefinitions[key]
					const label = fieldDef?.title || fieldDef?.placeholder || key

					// Для чекбоксов
					if (fieldDef?.type === 'checkbox') {
						if (!fieldDef.required && (!value || value.length === 0)) {
							return null
						}
						// Фильтруем значение "other" из массива
						const filteredValues = Array.isArray(value)
							? value.filter(v => v !== 'other')
							: value
						if (filteredValues.length === 0) return null
						return `${label}: ${Array.isArray(filteredValues) ? filteredValues.join(', ') : filteredValues}`
					}

					// Для радио-кнопок
					if (fieldDef?.type === 'radio') {
						if (!fieldDef.required && (!value || value.trim() === '')) {
							return null
						}
						// Если выбрано "other", но значение пустое, не отправляем
						if (value === 'other') {
							return null
						}
						return `${label}: ${value}`
					}

					if (fieldDef?.type === 'file' && value?.name) {
						return `${label}: Файл прикреплён (${value.name})`
					}

					if (
						!value ||
						value === undefined ||
						(typeof value === 'string' && !value.trim())
					) {
						return null
					}

					if (Array.isArray(value)) {
						if (value.length === 0) return null
						return `${label}: ${value.join(', ')}`
					}

					return `${label}: ${value}`
				})
				.filter(Boolean)
				.join('\n')
		}

		const transporter = nodemailer.createTransport({
			host: process.env.FORM_HOST,
			port: Number(process.env.FORM_PORT),
			secure: false,
			auth: {
				user: process.env.FORM_USER,
				pass: process.env.FORM_PASS
			}
		})

		const emailText = formatQuizData(data)

		if (!emailText.trim()) {
			await transporter.sendMail({
				from: process.env.FORM_USER,
				to: process.env.FORM_TO,
				subject: `Пустая заявка с сайта ${process.env.SITE_NAME}`,
				text: `Форма пустая, пользователь не ответил ни на один вопрос. Сделайте какие-нибудь поля обязательными, чтобы пользователь их заполнил! =)`
			})

			return NextResponse.json(
				{
					success: true,
					message: 'Отправлено информационное письмо о пустой форме'
				},
				{ status: 200 }
			)
		}

		const attachments: {
			filename: string
			content: string
			encoding: 'base64'
		}[] = []

		// Обрабатываем все файловые поля
		Object.entries(data).forEach(([key, value]) => {
			const fieldDef = formFields.find(field => field.name === key)
			if (fieldDef?.type === 'file' && value && typeof value === 'object') {
				const fileData = value as FileData
				attachments.push({
					filename: fileData.name,
					content: fileData.data.split('base64,')[1],
					encoding: 'base64'
				})
			}
		})

		await transporter.sendMail({
			from: process.env.FORM_USER,
			to: process.env.FORM_TO,
			subject: `Заявка с сайта ${process.env.SITE_NAME}`,
			text: emailText,
			attachments: attachments
		})

		return NextResponse.json({ success: true }, { status: 200 })
	} catch (error) {
		console.error('Error processing form:', error)
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
				details: 'Проверьте заполнение всех обязательных полей'
			},
			{ status: 500 }
		)
	}
}
