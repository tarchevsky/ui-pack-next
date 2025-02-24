'use client'

import { useEffect, useRef, useState } from 'react'
import Modal from './modal/Modal'
import type { ModalHandle } from './modal/modal.types'

interface CookieConsentProps {
	timeoutInSeconds?: number
	boxClasses?: string
}

const CookieConsent: React.FC<CookieConsentProps> = ({
	timeoutInSeconds = 0,
	boxClasses
}) => {
	const [isConsentGiven, setIsConsentGiven] = useState<boolean>(false)
	const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)
	const [isInitialized, setIsInitialized] = useState<boolean>(false)
	const modalRef = useRef<ModalHandle>(null)

	useEffect(() => {
		// Проверяем, что мы на клиенте
		if (typeof window !== 'undefined') {
			const storedConsent = localStorage.getItem('cookieConsent')
			setIsInitialized(true)

			if (storedConsent === 'true') {
				setIsConsentGiven(true)
			} else if (storedConsent === 'false') {
				setIsConsentGiven(false)
			} else {
				// Показываем модальное окно после таймаута
				const timer = setTimeout(() => {
					setShouldShowModal(true)
				}, timeoutInSeconds * 1000)

				return () => clearTimeout(timer)
			}
		}
	}, [timeoutInSeconds])

	// Отдельный useEffect для открытия модального окна
	useEffect(() => {
		if (shouldShowModal) {
			if (modalRef.current) {
				modalRef.current.showModal()
			}
		}
	}, [shouldShowModal])

	const handleAcceptCookies = () => {
		localStorage.setItem('cookieConsent', 'true')
		setIsConsentGiven(true)
		setShouldShowModal(false)
	}

	const handleCloseModal = () => {
		setShouldShowModal(false)
	}

	// Не показываем ничего до инициализации
	if (!isInitialized) {
		return null
	}

	if (isConsentGiven || !shouldShowModal) {
		return null
	}

	return (
		<Modal
			ref={modalRef}
			bottom
			closeIcon
			boxClasses={boxClasses}
			onClose={handleCloseModal}
		>
			<span>
				Этот сайт использует файлы cookie для улучшения работы и персонализации.
			</span>
			<button
				type='button'
				className='btn btn-primary mr-4'
				onClick={handleAcceptCookies}
			>
				Принять
			</button>
		</Modal>
	)
}

export default CookieConsent
