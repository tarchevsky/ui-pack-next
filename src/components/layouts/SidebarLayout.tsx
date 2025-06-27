'use client'

import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { PiDotsThreeVertical } from 'react-icons/pi'
import type { SidebarItem } from '../sidebar/Sidebar'
import { Sidebar } from '../sidebar/Sidebar'

interface SidebarLayoutProps {
	children: ReactNode
	sidebarItems: SidebarItem[]
	sidebarClassName?: string
	contentClassName?: string
}

export const SidebarLayout = ({
	children,
	sidebarItems,
	sidebarClassName,
	contentClassName = ''
}: SidebarLayoutProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [pageTitle, setPageTitle] = useState('')

	useEffect(() => {
		// Берем заголовок из title документа
		setPageTitle(document.title || '')
	}, [])

	return (
		<div className='relative lg:cont-left'>
			{/* Десктопная версия сайдбара (видимая только на lg и больше) */}
			<div className='hidden lg:flex lg:gap-10'>
				<div className={cn('w-80', sidebarClassName)}>
					<Sidebar
						items={sidebarItems}
						className={`sticky top-0 h-screen overflow-y-auto`}
					/>
				</div>
				<div className={`flex-1 ${contentClassName}`}>{children}</div>
			</div>

			{/* Мобильная версия (видимая только до lg) */}
			<div className='lg:hidden lg:cont-right'>
				<div className='flex flex-col min-h-screen'>
					{/* Шапка с кнопкой и заголовком - всегда видна */}
					<div className='sticky top-0 z-10 flex items-center shadow-sm p-2 bg-base-100'>
						<button
							className='btn btn-ghost'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<PiDotsThreeVertical size={24} />
						</button>

						<div className='flex-1 pl-2 text-xl font-semibold truncate'>
							{pageTitle}
						</div>
					</div>

					{/* Контейнер для содержимого и бокового меню */}
					<div className='flex flex-1'>
						{/* Боковое меню - показывается при isMenuOpen = true */}
						{isMenuOpen && (
							<div className='w-full'>
								<Sidebar
									items={sidebarItems}
									className={`h-full overflow-y-auto ${sidebarClassName}`}
								/>
							</div>
						)}

						{/* Основное содержимое - показывается при isMenuOpen = false */}
						<div
							className={`w-full ${!isMenuOpen ? 'block' : 'hidden'} ${contentClassName}`}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
