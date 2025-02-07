import { AnimatePresence, motion } from 'framer-motion'
import type { FC } from 'react'

interface ErrorMessageProps {
	message?: string
	className?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, className = '' }) => {
	return (
		<AnimatePresence mode='wait'>
			{message && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: 'auto', opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{
						type: 'spring',
						stiffness: 500,
						damping: 30,
						opacity: { duration: 0.2 }
					}}
					className='overflow-hidden'
				>
					<motion.span
						className={`text-red-500 text-sm ${className}`}
						initial={{ y: -10 }}
						animate={{ y: 0 }}
						exit={{ y: -10 }}
					>
						{message}
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ErrorMessage
