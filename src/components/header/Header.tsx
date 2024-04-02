import Link from 'next/link'

const Header = () => {
	return (
		<header>
			<div className='flex justify-evenly md:justify-between items-center py-4 fade-in'>
				<Link href='/'>LOGO</Link>
				<nav>
					<ul
						tabIndex={0}
						id='header-menu'
						className='menu flex-nowrap menu-horizontal header-menu__list'
					>
						<li className=''>
							<Link className='px-[10px]' href='/about'>
								Обо мне
							</Link>
						</li>
						<li className=''>
							<Link className='px-[10px]' href='/contacts'>
								Контакты
							</Link>
						</li>
					</ul>
					<div className='dropdown hidden xl:inline-block'>
						<a
							tabIndex={0}
							role='button'
							className='btn flex-nowrap text-start btn-ghost font-normal px-[10px]'
						>
							Цветовая схема
							<svg
								width='12px'
								height='12px'
								className='h-2 w-2 fill-current opacity-60 inline-block'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 2048 2048'
							>
								<path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
							</svg>
						</a>
						<ul className='dropdown-content z-[100] mt-2 p-2 shadow-2xl bg-base-300 rounded-box w-30 sm:w-52'>
							<li>
								<input
									type='radio'
									name='theme-dropdown'
									className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
									aria-label='Default'
									value='default'
								/>
							</li>
							<li>
								<input
									type='radio'
									name='theme-dropdown'
									className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
									aria-label='Cupcake'
									value='cupcake'
								/>
							</li>
							<li>
								<input
									type='radio'
									name='theme-dropdown'
									className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
									aria-label='Nord'
									value='nord'
								/>
							</li>
							<li>
								<input
									type='radio'
									name='theme-dropdown'
									className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
									aria-label='Business'
									value='business'
								/>
							</li>
							<li>
								<input
									type='radio'
									name='theme-dropdown'
									className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
									aria-label='Black'
									value='black'
								/>
							</li>
							<li>
								<input
									type='radio'
									name='theme-dropdown'
									className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
									aria-label='Dim'
									value='dim'
								/>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Header
