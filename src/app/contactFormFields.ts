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
		name: 'message',
		type: 'textarea',
		title: 'Сообщение',
		placeholder: 'Сообщение',
		required: false,
		error: 'Пожалуйста, введите сообщение'
	},
	{
		name: 'game',
		type: 'radio',
		title: 'Любимая приставка',
		required: true,
		error: 'Выберите свою любимую приставку',
		options: [
			{ label: 'Дэнди', value: 'dandy' },
			{ label: 'Плейстейшан', value: 'ps' },
			{ label: 'Nintendo', value: 'nintendo' }
		],
		other: true,
		otherPlaceholder: 'Укажите свою любимую приставку'
	},
	{
		name: 'gamecheck',
		type: 'checkbox',
		title: 'Любимая приставка опции',
		required: true,
		error: 'Выберите несколько любимых приставок',
		options: [
			{ label: 'Дэнди', value: 'dandy' },
			{ label: 'Плейстейшан', value: 'ps' },
			{ label: 'Nintendo', value: 'nintendo' }
		],
		other: true,
		otherPlaceholder: 'Укажите свою любимую приставку'
	},
	{
		name: 'interests',
		type: 'checkbox',
		title: 'Интересующие направления',
		required: true,
		error: 'Выберите хотя бы одно направление',
		options: [
			{ label: 'Разработка сайтов', value: 'web' },
			{ label: 'Мобильные приложения', value: 'mobile' },
			{ label: 'UI/UX дизайн', value: 'design' },
			{ label: 'SEO продвижение', value: 'seo' }
		],
		other: true,
		otherPlaceholder: 'Укажите свое направление'
	},
	{
		name: 'captcha',
		type: 'captcha',
		error: 'Пожалуйста, решите пример'
	}
]
