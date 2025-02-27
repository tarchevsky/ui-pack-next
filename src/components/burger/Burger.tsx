import type { BurgerProps } from '@/types'
import cn from 'clsx'
import styles from './Burger.module.scss'

const Burger = ({
	toggleMenu,
	isActive,
	className,
	isBurgerVersion = false
}: BurgerProps) => {
	return (
		<button
			className={cn(
				styles.burger,
				'absolute w-[30px] h-[20px] inset-y-1/2 right-0 -translate-y-1/2 cursor-pointer z-20',
				{ 'md:hidden': !isBurgerVersion },
				className
			)}
			aria-label='Open the menu'
			onClick={toggleMenu}
		>
			<div
				className={cn(
					styles.inner,
					{ [styles.active]: isActive },
					'relative z-20 top-0 start-0 h-full'
				)}
			>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</button>
	)
}

export default Burger
