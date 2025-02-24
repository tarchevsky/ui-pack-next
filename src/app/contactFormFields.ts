import type { FormField } from '@/components/contactForm/contactForm.types'

export const contactFormFields: FormField[] = [
	{
		name: 'name',
		type: 'text',
		title: 'Имя',
		placeholder: 'Имя',
		required: false,
		error: 'Введите своё имя'
	},
	{
		name: 'email',
		type: 'email',
		title: 'Почта',
		placeholder: 'Почта',
		required: false,
		error: 'Введите корректный email адрес',
		pattern: '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$',
		patternFlags: 'i'
	},
	{
		name: 'phone',
		type: 'tel',
		title: 'Телефон',
		placeholder: 'Телефон',
		required: false,
		error: 'Введите корректный номер телефона',
		pattern:
			'^(\\+7|7|8)?[\\s-]?\\(?[489][0-9]{2}\\)?[\\s-]?[0-9]{3}[\\s-]?[0-9]{2}[\\s-]?[0-9]{2}$'
	},
	{
		name: 'policy',
		type: 'radio',
		title: 'Политика конфиденциальности',
		required: true,
		error: 'Отметьте, что вы ознакомлены с нашей политикой',
		options: [{ label: 'Я согласен с условиями', value: 'agree' }],
		privacyLink: '/privacy-policy',
		privacyLinkText: 'Подробнее о политике конфиденциальности'
	},
	{
		name: 'captcha',
		type: 'captcha',
		error: 'Пожалуйста, решите пример'
	}
]
