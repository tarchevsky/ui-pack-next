export interface ModalProps {
	message?: string
	children?: React.ReactNode
	onClose?: () => void
}

export interface ModalHandle {
	showModal: () => void
}
