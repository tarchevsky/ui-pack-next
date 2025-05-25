'use client'

import type { HeroProps, ModalContentProps } from '@/types'
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
	modalContent,
	closeIcon,
	config
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
			const element = modalContent as React.ReactElement<ModalContentProps>
			return React.cloneElement(element, {
				onSuccess: handleSuccess,
				closeIcon: closeIcon
			})
		}

		return modalContent
	}

	return (
		<FadeIn tag='main' className='hero ind'>
			<div
				className={`${config !== 'center' ? 'cont h-[80svh] max-w-full w-full p-0 block' : 'md:min-h-[80vh]'} relative hero-content flex-col-reverse items-start lg:items-center lg:flex-row`}
			>
				<Image
					className={`${
						config === 'center'
							? 'lg:w-1/2 h-[300px] md:h-[600px] md:min-w-[600px]'
							: 'w-full h-full brightness-50'
					} object-cover rounded-box shadow-2xl`}
					src={src}
					alt={alt}
					width={1300}
					height={900}
					priority
					unoptimized={unoptimized}
				/>
				<div
					className={`${config === 'center' ? 'lg:ml-[-100px] md:relative' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'} z-10`}
				>
					<h1
						className={`${config !== 'center' ? 'text-primary-content' : ''} text-5xl font-extrabold`}
					>
						{title}
					</h1>
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
				<Modal ref={modalRef} onClose={handleModalClose} closeIcon={closeIcon}>
					{renderModalContent()}
				</Modal>
			)}
		</FadeIn>
	)
}

export default Hero
