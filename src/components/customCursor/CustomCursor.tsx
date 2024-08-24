import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.scss'

interface CustomCursorProps {
	size?: number
}

const CustomCursor: React.FC<CustomCursorProps> = ({ size = 20 }) => {
	const cursorX = useMotionValue(-100)
	const cursorY = useMotionValue(-100)

	const springConfig = { damping: 80, stiffness: 600 }
	const cursorXSpring = useSpring(cursorX, springConfig)
	const cursorYSpring = useSpring(cursorY, springConfig)

	const [isHoveringText, setIsHoveringText] = useState(false)

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX - size / 2)
			cursorY.set(e.clientY - size / 2)
		}

		const handleMouseEnter = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null
			if (
				target &&
				(target.tagName === 'A' ||
					target.tagName === 'BUTTON' ||
					target.tagName === 'P' ||
					target.tagName === 'H1' ||
					target.tagName === 'H2' ||
					target.tagName === 'H3' ||
					target.tagName === 'H4' ||
					target.tagName === 'H5' ||
					target.tagName === 'H6')
			) {
				setIsHoveringText(true)
			}
		}

		const handleMouseLeave = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null
			if (
				target &&
				(target.tagName === 'A' ||
					target.tagName === 'BUTTON' ||
					target.tagName === 'P' ||
					target.tagName === 'H1' ||
					target.tagName === 'H2' ||
					target.tagName === 'H3' ||
					target.tagName === 'H4' ||
					target.tagName === 'H5' ||
					target.tagName === 'H6')
			) {
				setIsHoveringText(false)
			}
		}

		window.addEventListener('mousemove', moveCursor)
		document.addEventListener('mouseover', handleMouseEnter)
		document.addEventListener('mouseout', handleMouseLeave)

		// Add custom class to body
		document.body.classList.add(styles.customCursor)

		return () => {
			window.removeEventListener('mousemove', moveCursor)
			document.removeEventListener('mouseover', handleMouseEnter)
			document.removeEventListener('mouseout', handleMouseLeave)
			// Remove custom class from body when component unmounts
			document.body.classList.remove(styles.customCursor)
		}
	}, [cursorX, cursorY, size])

	return (
		<motion.div
			className={`${styles.customCursorElement} ${isHoveringText ? styles.hoveringText : ''}`}
			style={{
				position: 'fixed',
				left: cursorXSpring,
				top: cursorYSpring,
				borderRadius: '50%',
				backgroundColor: 'white',
				mixBlendMode: 'difference',
				pointerEvents: 'none',
				zIndex: 9999
			}}
			animate={{
				width: isHoveringText ? size * 2 : size,
				height: isHoveringText ? size * 2 : size
			}}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 30
			}}
		/>
	)
}

export default CustomCursor
