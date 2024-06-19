// components/PageTransition.js
import { motion } from 'framer-motion'
import { LayoutProps } from '@/types'

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
