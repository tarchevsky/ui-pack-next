'use client'

import type { LayoutProps } from '@/types'
import cn from 'clsx'
import { motion, useInView, type MotionStyle } from 'framer-motion'
import { useRef } from 'react'

const FadeIn = ({
	children,
	className,
	delay = 0.2,
	style,
	tag = 'div'
}: LayoutProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })

	const MotionComponent = motion[tag] || motion.div

	return (
		<MotionComponent
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 1, delay }}
			{...(className ? { className: cn(className) } : {})}
			style={style as MotionStyle}
		>
			{children}
		</MotionComponent>
	)
}

export default FadeIn
