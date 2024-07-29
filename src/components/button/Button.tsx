import cn from 'clsx'
import { ModalHandle } from '@/components/modal/modal.types'
import { useRef } from 'react'
import Modal from '@/components/modal/Modal'
import Link from 'next/link'
import { ButtonProps } from '@/types'

const Button = ({
	tag,
	text,
	href,
	ariaLabel,
	type,
	className,
	modalContent
}: ButtonProps) => {
	const modalRef = useRef<ModalHandle>(null)

	const handleButtonClick = () => {
		if (modalRef.current && modalContent) {
			modalRef.current.showModal()
		}
	}

	return (
		<>
			{(tag === 'button' && (
				<button
					type={type}
					aria-label={ariaLabel}
					className={cn('btn', className)}
					dangerouslySetInnerHTML={{
						__html: text
					}}
					onClick={handleButtonClick}
				/>
			)) ||
				(tag === 'link' &&
					href && ( // Проверяем, что href определен
						<Link
							href={href}
							role='button'
							aria-label={ariaLabel}
							className={cn('btn', className)}
							dangerouslySetInnerHTML={{
								__html: text
							}}
							onClick={handleButtonClick}
						/>
					))}
			{modalContent && (
				<Modal ref={modalRef}>
					{typeof modalContent === 'string' ? (
						<p>{modalContent}</p>
					) : (
						modalContent
					)}
				</Modal>
			)}
		</>
	)
}

export default Button
