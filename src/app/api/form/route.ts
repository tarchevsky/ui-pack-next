import type { FormField } from '@/components/contactForm/contactForm.types'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface FormData {
	fields: FormField[]
	values: {
		[key: string]: any
	}
}

type Option = {
	label: string
	value: string
}

export async function POST(req: NextRequest) {
	try {
		const { fields, values }: FormData = await req.json()

		const transporter = nodemailer.createTransport({
			host: process.env.FORM_HOST,
			port: Number(process.env.FORM_PORT),
			secure: false,
			auth: {
				user: process.env.FORM_USER,
				pass: process.env.FORM_PASS
			}
		})

		// Формируем текст письма из всех полей формы
		const messageText = Object.entries(values)
			.filter(([key, value]) => {
				// Исключаем поле captcha и пустые значения
				if (key === 'captcha' || key === 'agreement') return false
				if (value === undefined || value === null || value === '') return false
				if (Array.isArray(value) && value.length === 0) return false
				return true
			})
			.map(([key, value]) => {
				const field = fields.find((f: FormField) => f.name === key)
				if (!field) return `${key}: ${value}`

				const fieldTitle = field.title || field.label || key

				// Для radio с кастомным значением
				if (field.type === 'radio' && field.options) {
					const option = (field.options as Option[]).find(
						opt => opt.value === value
					)
					if (option) {
						return `${fieldTitle}: ${option.label}`
					}
					// Если значение не найдено в options, значит это кастомное значение
					return `${fieldTitle}: ${value}`
				}

				// Для файлов возвращаем имена файлов
				if (field.type === 'file' && Array.isArray(value)) {
					return `${fieldTitle}: ${value.join(', ')}`
				}

				// Для чекбоксов объединяем выбранные значения
				if (field.type === 'checkbox' && Array.isArray(value)) {
					const selectedOptions = value.map(val => {
						const option = (field.options as Option[])?.find(
							opt => opt.value === val
						)
						return option ? option.label : val
					})
					return `${fieldTitle}: ${selectedOptions.join(', ')}`
				}

				return `${fieldTitle}: ${value}`
			})
			.join('\n')

		await transporter.sendMail({
			from: process.env.FORM_USER,
			to: process.env.FORM_TO,
			subject: `Заявка с сайта ${process.env.SITE_NAME}`,
			text: messageText
		})

		return NextResponse.json({ success: true }, { status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		)
	}
}
