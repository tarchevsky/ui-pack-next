import { cn } from '@/utils/cn'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { ModalHandle, ModalProps } from './modal.types'

const Modal = forwardRef<ModalHandle, ModalProps>(
	({ message, children, onClose, bottom, closeIcon, boxClasses }, ref) => {
		const modalRef = useRef<HTMLDialogElement>(null)

		useImperativeHandle(ref, () => ({
			showModal: () => {
				if (modalRef.current) {
					modalRef.current.showModal()
				}
			}
		}))

		const handleClose = () => {
			if (modalRef.current) {
				modalRef.current.close()
				onClose?.()
			}
		}

		const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
			// Проверяем, был ли клик снаружи модального окна
			if (event.target === modalRef.current) {
				handleClose()
			}
		}

		return (
			<dialog
				ref={modalRef}
				className={cn('modal outline-none', bottom && 'modal-bottom')}
				onClick={handleDialogClick}
			>
				<div className={cn('modal-box outline-none', boxClasses)}>
					{message ? <p className='py-4'>{message}</p> : null}
					{children}

					<div className='modal-action'>
						{closeIcon ? (
							<button
								className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
								onClick={handleClose}
							>
								✕
							</button>
						) : (
							<button type='button' className='btn' onClick={handleClose}>
								Закрыть
							</button>
						)}
					</div>
				</div>
			</dialog>
		)
	}
)

Modal.displayName = 'Modal'

export default Modal
