'use client'

import ContactForm from './ContactForm'
import type { FormField } from './contactForm.types'

interface ModalContactFormProps {
	fields: FormField[]
	onSuccess?: (message: string) => void
	message?: string
	closeIcon?: boolean
	title?: string
}

const ModalContactForm = ({
	title = 'Оставьте заявку',
	fields,
	onSuccess,
	message,
	closeIcon
}: ModalContactFormProps) => {
	return (
		<>
			{title && (
				<h4 className='ind-sm text-center text-2xl font-bold'>{title}</h4>
			)}

			<ContactForm
				fields={fields}
				useParentModal
				onSuccess={onSuccess}
				message={message}
				closeIcon={closeIcon}
			/>
		</>
	)
}

export default ModalContactForm
