import type { SidebarItem } from '@/components/sidebar/Sidebar'

export const documentationSidebar: SidebarItem[] = [
	{
		title: 'Введение',
		href: '/documentation'
	},
	{
		title: 'Компоненты',
		isExpanded: true,
		children: [
			{
				title: 'UI компоненты',
				isExpanded: true,
				children: [
					{ title: 'Кнопки', href: '#buttons' },
					{ title: 'Формы', href: '#forms' },
					{ title: 'Модальные окна', href: '#modals' }
				]
			},
			{
				title: 'Макеты',
				children: [
					{ title: 'Обычный макет', href: '#default-layout' },
					{ title: 'Макет с сайдбаром', href: '#sidebar-layout' }
				]
			}
		]
	},
	{
		title: 'Руководства',
		children: [
			{ title: 'Начало работы', href: '#getting-started' },
			{ title: 'Установка', href: '#installation' },
			{ title: 'Конфигурация', href: '#configuration' }
		]
	}
]
