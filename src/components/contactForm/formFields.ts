import type { FormField as QuizFormField } from '../quiz/quiz.types'

export type FormField = Omit<QuizFormField, 'step'> & {
	pattern?: RegExp
}

export const formFields: FormField[] = [
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
		pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	},
	{
		name: 'phone',
		type: 'tel',
		title: 'Телефон',
		placeholder: 'Телефон',
		required: false,
		error: 'Введите корректный номер телефона',
		pattern:
			/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/
	},
	{
		name: 'message',
		type: 'textarea',
		title: 'Сообщение',
		placeholder: 'Сообщение',
		required: false
	},
	{
		name: 'topic',
		type: 'radio',
		title: 'Тема обращения',
		required: false,
		error: 'Выберите тему обращения',
		options: [
			{ label: 'Техническая поддержка', value: 'support' },
			{ label: 'Общие вопросы', value: 'general' },
			{ label: 'Сотрудничество', value: 'partnership' }
		],
		other: true,
		otherPlaceholder: 'Укажите свою тему'
	},
	{
		name: 'interests',
		type: 'checkbox',
		title: 'Интересующие направления',
		required: false,
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
