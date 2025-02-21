import type { ReactNode } from 'react'

export interface ModalProps {
	message?: string | ReactNode
	children?: ReactNode
	onClose?: () => void
	bottom?: boolean
	closeIcon?: boolean
	boxClasses?: string
}

export interface ModalHandle {
	showModal: () => void
}
