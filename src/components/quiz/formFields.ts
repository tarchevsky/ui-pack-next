export const formFields = [
	{
		step: 1,
		name: 'name',
		type: 'text',
		label: 'Имя',
		required: true
	},
	{
		step: 1,
		name: 'email',
		type: 'email',
		label: 'Почта',
		required: true
	},
	{
		step: 2,
		name: 'phone',
		type: 'tel',
		label: 'Телефон',
		required: true
	},
	{
		step: 2,
		name: 'message',
		type: 'textarea',
		label: 'Сообщение',
		required: false
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
		required: true
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
	}
]
