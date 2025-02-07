// components/PageTransition.js
'use client'

import type { LayoutProps } from '@/types'
import { motion } from 'framer-motion'

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
	exit: { opacity: 0 }
}

const PageTransition = ({ children }: LayoutProps) => (
	<motion.div
		initial='hidden'
		animate='enter'
		exit='exit'
		variants={variants}
		transition={{ duration: 0.2 }}
	>
		{children}
	</motion.div>
)

export default PageTransition
