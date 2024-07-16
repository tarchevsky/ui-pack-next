export interface ModalProps {
	message?: string
	children?: React.ReactNode
}

export interface ModalHandle {
	showModal: () => void
}
