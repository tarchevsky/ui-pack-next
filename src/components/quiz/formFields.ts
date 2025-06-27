import type { FormField } from './quiz.types'

export const formFields: FormField[] = [
	{
		step: 1,
		name: 'name',
		type: 'text',
		placeholder: 'Имя',
		required: false,
		error: 'Пожалуйста, введите имя'
	},
	{
		step: 1,
		name: 'email',
		type: 'email',
		placeholder: 'Почта',
		required: false,
		error: 'Пожалуйста, введите почту'
	},
	{
		step: 2,
		name: 'phone',
		type: 'tel',
		placeholder: 'Телефон',
		required: false,
		error: 'Пожалуйста, введите телефон'
	},
	{
		step: 2,
		name: 'message',
		type: 'textarea',
		placeholder: 'Напишите, как вы себя чувствуете',
		required: false,
		error: 'Пожалуйста, напишите, как вы себя чувствуете'
	},
	{
		step: 2,
		name: 'experience_level',
		type: 'radio',
		title: 'Ваш уровень опыта',
		options: [
			{ label: 'Начинающий', value: 'beginner' },
			{ label: 'Средний', value: 'intermediate' },
			{ label: 'Продвинутый', value: 'advanced' }
		],
		required: false,
		error: 'Пожалуйста, выберите ваш уровень опыта',
		other: true,
		otherPlaceholder: 'Укажите свой уровень'
	},
	{
		step: 3,
		name: 'interests',
		type: 'checkbox',
		title: 'Какие технологии вас интересуют?',
		options: [
			{ label: 'React', value: 'react' },
			{ label: 'Vue', value: 'vue' },
			{ label: 'Angular', value: 'angular' },
			{ label: 'Node.js', value: 'nodejs' }
		],
		required: true,
		error: 'Выберите хотя бы один вариант',
		other: true,
		otherPlaceholder: 'Укажите другую технологию'
	},
	{
		step: 3,
		name: 'experience',
		type: 'select',
		title: 'Ваш опыт в разработке',
		options: [
			{ label: 'Менее 1 года', value: 'junior' },
			{ label: '1-3 года', value: 'middle' },
			{ label: 'Более 3 лет', value: 'senior' }
		],
		required: false,
		error: 'Пожалуйста, выберите ваш опыт'
	},
	{
		step: 4,
		name: 'companies',
		type: 'checkbox',
		title: 'Какие технические компании вам интересны?',
		options: [
			{ label: 'Apple', value: 'apple' },
			{ label: 'Яндекс', value: 'yandex' },
			{ label: 'Tesla', value: 'tesla' },
			{ label: 'SpaceX', value: 'spacex' },
			{ label: 'OpenAI', value: 'openai' }
		],
		required: true,
		error: 'Выберите хотя бы один вариант',
		other: true,
		otherPlaceholder: 'Укажите другую компанию'
	},
	{
		step: 4,
		name: 'game',
		type: 'file',
		required: false,
		title: 'Загрузите вашу любимую игру',
		accept: '.png,.jpg,.jpeg',
		maxSize: 5 * 1024 * 1024, // 5MB
		error: 'Пожалуйста, загрузите файл размером до 5MB'
	},
	{
		step: 4,
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
		step: 4,
		name: 'captcha',
		type: 'captcha',
		required: false,
		error: 'Пожалуйста, решите пример'
	}
]
