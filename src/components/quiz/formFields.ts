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
		placeholder: 'Сообщение'
	},
	{
		step: 3,
		name: 'pizzaOpinion',
		type: 'radio',
		title: 'Пицца это полезно или нет?',
		options: [
			{ label: 'Полезно', value: 'полезно' },
			{ label: 'Не полезно', value: 'не полезно' },
			{ label: 'Зависит от ингредиентов', value: 'зависит от ингридиентов' }
		],
		hasOtherOption: true,
		otherOptionPlaceholder: 'Опишите Ваше мнение',
		placeholder: 'Опишите Ваше мнение?'
	},
	{
		step: 4,
		name: 'backendRequired',
		type: 'radio',
		title: 'Нужно ли учить бэкенд?',
		options: [
			{ label: 'Да', value: 'Да' },
			{ label: 'Нет', value: 'Нет' },
			{ label: 'Не знаю', value: 'Не знаю' }
		]
	},
	{
		step: 4,
		name: 'backendRequiredOther',
		type: 'text',
		placeholder: 'Другое'
	},
	{
		step: 5,
		name: 'interests',
		type: 'checkbox',
		title: 'Какие технологии вас интересуют?',
		options: [
			{ label: 'React', value: 'react' },
			{ label: 'Vue', value: 'vue' },
			{ label: 'Angular', value: 'angular' },
			{ label: 'Node.js', value: 'nodejs' }
		],
		required: false,
		error: 'Выберите хотя бы один вариант',
		hasOtherOption: true,
		otherOptionPlaceholder: 'Укажите другую технологию',
		placeholder: 'Укажите другую технологию?'
	},
	{
		step: 5,
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
		step: 6,
		name: 'resume',
		type: 'file',
		required: false,
		title: 'Загрузите ваше резюме',
		accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg',
		maxSize: 5 * 1024 * 1024, // 5MB
		error: 'Пожалуйста, загрузите файл размером до 5MB'
	},
	{
		step: 6,
		name: 'review',
		type: 'text',
		required: true,
		title: 'Напишите отзыв',
		error: 'Пожалуйста, напишите отзыв'
	}
]
