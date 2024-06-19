import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import cn from 'clsx'
import { LayoutProps } from '@/types'

const FadeIn = ({ children, className, delay = 0.2 }: LayoutProps) => {
	const controls = useAnimation()
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					controls.start('visible')
				}
			},
			{
				// Настройки observer'a. Можно изменить, чтобы анимация начиналась, например, когда элемент только начинает появляться.
				threshold: 0.5 // 50% элемента должно быть видно, чтобы анимация сработала.
			}
		)
		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [controls])

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial='hidden'
			transition={{ duration: 1, delay }} // Настройка продолжительности анимации
			variants={{
				visible: { opacity: 1, y: 0 },
				hidden: { opacity: 0, y: 20 } // Начальное положение элемента перед анимацией
			}}
			className={cn(className)}
		>
			{children}
		</motion.div>
	)
}
export default FadeIn
