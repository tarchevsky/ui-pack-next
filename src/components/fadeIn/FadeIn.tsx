import { motion, MotionStyle, useInView } from 'framer-motion'
import { useRef } from 'react'
import { LayoutProps } from '@/types'
import cn from 'clsx'

const FadeIn = ({ children, className, delay = 0.2, style }: LayoutProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 1, delay }}
			className={cn(className)}
			style={style as MotionStyle}
		>
			{children}
		</motion.div>
	)
}
export default FadeIn
