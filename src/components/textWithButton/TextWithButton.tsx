'use client'

import type { ModalContentProps } from '@/types'
import React, { useRef, useState } from 'react'
import FadeIn from '../fadeIn/FadeIn'
import Modal from '../modal/Modal'
import type { ModalHandle } from '../modal/modal.types'
import type { TextWithButtonProps } from './types'

const TextWithButton = ({ modalContent, closeIcon }: TextWithButtonProps) => {
	const modalRef = useRef<ModalHandle>(null)
	const [modalMessage, setModalMessage] = useState<string | null>(null)

	const handleButtonClick = () => {
		if (modalRef.current && modalContent) {
			setModalMessage(null)
			modalRef.current.showModal()
		}
	}

	const handleSuccess = (message: string) => {
		setModalMessage(message)
	}

	const handleModalClose = () => {
		setModalMessage(null)
	}

	const renderModalContent = () => {
		if (modalMessage) {
			return <p className='py-4'>{modalMessage}</p>
		}

		if (React.isValidElement(modalContent)) {
			const element = modalContent as React.ReactElement<ModalContentProps>
			return React.cloneElement(element, {
				onSuccess: handleSuccess,
				closeIcon: closeIcon
			})
		}

		return modalContent
	}

	return (
		<FadeIn className='ind cont'>
			<div className='mt-16 flex items-center justify-between'>
				<p className='text-2xl'>Остались вопросы?</p>
				<button className='btn btn-lg' onClick={handleButtonClick}>
					Задать вопрос
				</button>
			</div>

			{modalContent && (
				<Modal ref={modalRef} onClose={handleModalClose} closeIcon={closeIcon}>
					{renderModalContent()}
				</Modal>
			)}
		</FadeIn>
	)
}

export default TextWithButton
