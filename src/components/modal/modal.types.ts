import type { ReactNode } from 'react'

export interface ModalProps {
	message?: string | ReactNode
	children?: ReactNode
	onClose?: () => void
}

export interface ModalHandle {
	showModal: () => void
}
