import type { ModalContentProps } from '@/types'

export interface TextWithButtonProps {
	modalContent?: React.ReactNode | React.ReactElement<ModalContentProps>
	closeIcon?: boolean
}
