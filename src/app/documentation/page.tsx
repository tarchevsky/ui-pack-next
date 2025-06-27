import FadeIn from '@/components/fadeIn/FadeIn'
import { SidebarLayout } from '@/components/layouts/SidebarLayout'
import PageHeading from '@/components/pageHeading/PageHeading'
import type { Metadata } from 'next'
import { documentationSidebar } from './documentationSidebar'

export const metadata: Metadata = {
	title: 'Документация',
	description: 'Страница документации и о том что и для чего'
}

export default function Documentation() {
	return (
		<SidebarLayout sidebarItems={documentationSidebar} sidebarClassName=''>
			<PageHeading
				className='cont mb-4 mt-4 lg:pl-0 md:cont-right'
				title='Документация'
			/>
			<FadeIn className='cont lg:pl-0 md:cont-right ind'>
				<article className='prose max-w-none'>
					<h1 id='introduction'>Введение</h1>
					<p>
						Документация по компонентам и использованию UI-пакета. Здесь вы
						найдете все необходимые инструкции по внедрению и настройке
						компонентов в вашем проекте.
					</p>

					<h2 id='buttons'>Кнопки</h2>
					<p>
						Компонент Button является основным компонентом для взаимодействия с
						пользователем.
					</p>
					<div className='flex flex-wrap gap-2'>
						<button className='btn'>Обычная</button>
						<button className='btn btn-primary'>Основная</button>
						<button className='btn btn-secondary'>Вторичная</button>
						<button className='btn btn-accent'>Акцентная</button>
					</div>

					<h2 id='forms'>Формы</h2>
					<p>Формы используются для сбора информации от пользователей.</p>
					<div className='flex flex-col gap-4'>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Имя</span>
							</label>
							<input
								type='text'
								placeholder='Введите имя'
								className='input input-bordered w-full'
							/>
						</div>
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<input
								type='email'
								placeholder='email@example.com'
								className='input input-bordered w-full'
							/>
						</div>
					</div>

					<h2 id='modals'>Модальные окна</h2>
					<p>
						Модальные окна используются для отображения важной информации или
						запроса действия от пользователя.
					</p>
				</article>
			</FadeIn>
		</SidebarLayout>
	)
}
