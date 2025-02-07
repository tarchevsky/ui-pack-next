import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface FormData {
	name: string
	email: string
	phone: string
	message?: string
	title?: string
}

export async function POST(req: NextRequest) {
	try {
		const data: FormData = await req.json()
		const { name, email, phone, message, title } = data

		const transporter = nodemailer.createTransport({
			host: process.env.FORM_HOST,
			port: Number(process.env.FORM_PORT),
			secure: false,
			auth: {
				user: process.env.FORM_USER,
				pass: process.env.FORM_PASS
			}
		})

		await transporter.sendMail({
			from: process.env.FORM_USER,
			to: process.env.FORM_TO,
			subject: `Заявка с сайта ${process.env.SITE_NAME}`,
			text: `${title ? `Страница: ${title}\n` : ''}Имя: ${name}\nПочта: ${email}\nТелефон: ${phone}\nСообщение: ${message}`
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
