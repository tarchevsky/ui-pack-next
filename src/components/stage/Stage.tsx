import FadeIn from '../fadeIn/FadeIn'

const stages = [
	{
		title: 'Знакомство',
		subtitle: 'в любом мессенджере',
		description:
			'Краткое обсуждение проекта, условий сотрудничества ответы на все вопросы, назначение даты брифинга'
	},
	{
		title: 'Брифинг',
		subtitle: 'в удобном для Вас формате',
		description:
			'Необходим для уточнения деталей проекта, возможен в форматах: -звонка/видеозвонка -заполнения анкеты'
	},
	{
		title: 'Договор',
		subtitle: 'Подписание договора',
		description:
			'Подписываем договор. Отправляю Вам таблицу с указанием дат для каждого этапа работы. Внесение предоплаты 50%'
	},
	{
		title: 'Проект',
		subtitle: 'Работа над проектом',
		description:
			'Утверждение каждого этапа разработки Вами, дополнительные вопросы от меня. Если необходимы недостающие файлы, прошу их выслать.'
	},
	{
		title: 'Презентация',
		subtitle: 'проекта с описанием',
		description:
			'Презентую проект, описываю каждое свое решение, демонстрирую дизайн на различных носителях для наглядности'
	},
	{
		title: 'Материалы',
		subtitle: 'Передача материалов',
		description:
			'Внесение оставшейся суммы. Передача исходных материалов на Google диске в необходимых форматах'
	}
]

const Stage = () => {
	return (
		<FadeIn>
			<h2 className='ind cont text-4xl'>Этапы работы</h2>

			<div className='ind grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-base-content border-t border-b border-base-content'>
				{stages.map((stage, index) => (
					<div key={index} className='p-24 bg-base-100'>
						<div className='flex items-center gap-4 mb-4'>
							<span className='text-3xl font-light'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<h3 className='text-2xl'>{stage.title}</h3>
						</div>

						{stage.subtitle && <p className='mb-4'>{stage.subtitle}</p>}

						<p className='text-gray-400 text-sm'>{stage.description}</p>
					</div>
				))}
			</div>
		</FadeIn>
	)
}

export default Stage
