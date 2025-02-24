import type { FormField } from '@/components/contactForm/contactForm.types'

export const documentationForm: FormField[] = [
	{
		name: 'name',
		type: 'text',
		title: 'Имя',
		placeholder: 'Имя',
		required: true,
		error: 'Введите своё имя'
	},
	{
		name: 'email',
		type: 'email',
		title: 'Почта',
		placeholder: 'Почта',
		required: true,
		error: 'Введите email адрес',
		pattern: '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$',
		patternFlags: 'i'
	},
	{
		name: 'phone',
		type: 'tel',
		title: 'Телефон',
		placeholder: 'Телефон',
		required: true,
		error: 'Введите номер телефона',
		pattern:
			'^(\\+7|7|8)?[\\s-]?\\(?[489][0-9]{2}\\)?[\\s-]?[0-9]{3}[\\s-]?[0-9]{2}[\\s-]?[0-9]{2}$'
	},
	{
		name: 'captcha',
		type: 'captcha',
		error: 'Пожалуйста, решите пример'
	}
]
