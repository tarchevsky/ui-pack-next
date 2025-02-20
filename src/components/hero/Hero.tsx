'use client'

import type { HeroProps } from '@/types'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import FadeIn from '../fadeIn/FadeIn'
import Modal from '../modal/Modal'
import type { ModalHandle } from '../modal/modal.types'

const Hero = ({
	title,
	buttonText,
	alt,
	subtitle,
	src,
	unoptimized,
	modalContent
}: HeroProps) => {
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
			return React.cloneElement(modalContent, { onSuccess: handleSuccess })
		}

		return modalContent
	}

	return (
		<FadeIn tag='main' className='hero cont md:min-h-[80vh] ind'>
			<div className='relative hero-content flex-col-reverse items-start lg:items-center lg:flex-row'>
				<Image
					className='lg:w-1/2 h-[300px] md:h-[600px] md:min-w-[600px] object-cover rounded-box shadow-2xl'
					src={src}
					alt={alt}
					width={400}
					height={300}
					priority
					unoptimized={unoptimized}
				/>
				<div className='md:relative lg:ml-[-100px] z-10'>
					<h1 className='text-5xl font-extrabold'>{title}</h1>
					{subtitle ? <p>{subtitle}</p> : null}
					{buttonText ? (
						<button
							className='btn btn-primary btn-lg mt-3'
							onClick={handleButtonClick}
						>
							{buttonText}
						</button>
					) : null}
				</div>
			</div>
			{modalContent && (
				<Modal ref={modalRef} onClose={handleModalClose}>
					{renderModalContent()}
				</Modal>
			)}
		</FadeIn>
	)
}

export default Hero
