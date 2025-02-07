import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
	try {
		const data = await req.json()

		const transporter = nodemailer.createTransport({
			host: process.env.FORM_HOST,
			port: Number(process.env.FORM_PORT),
			secure: false,
			auth: {
				user: process.env.FORM_USER,
				pass: process.env.FORM_PASS
			}
		})

		const emailText = Object.entries(data)
			.map(([key, value]) => `${key}: ${value}`)
			.join('\n')

		if (!emailText.trim()) {
			throw new Error('Форма не содержит данных')
		}

		const attachments = data.resume
			? [
					{
						filename: data.resume.name,
						content: data.resume.data.split('base64,')[1],
						encoding: 'base64'
					}
				]
			: []

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
