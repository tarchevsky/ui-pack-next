import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { ModalHandle, ModalProps } from './modal.types'

const Modal = forwardRef<ModalHandle, ModalProps>(
	({ message, children }, ref) => {
		const modalRef = useRef<HTMLDialogElement>(null)

		useImperativeHandle(ref, () => ({
			showModal: () => {
				if (modalRef.current) {
					modalRef.current.showModal()
				}
			}
		}))

		return (
			<dialog ref={modalRef} className='modal'>
				<div className='modal-box'>
					{message ? <p className='py-4'>{message}</p> : null}
					{children}
					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn'>Закрыть</button>
						</form>
					</div>
				</div>
			</dialog>
		)
	}
)

Modal.displayName = 'Modal'

export default Modal
