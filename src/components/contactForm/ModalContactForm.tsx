'use client'

import ContactForm from './ContactForm'
import type { FormField } from './contactForm.types'

interface ModalContactFormProps {
	fields: FormField[]
	onSuccess?: (message: string) => void
	message?: string
	closeIcon?: boolean
}

const ModalContactForm = ({
	fields,
	onSuccess,
	message,
	closeIcon
}: ModalContactFormProps) => {
	return (
		<ContactForm
			fields={fields}
			useParentModal
			onSuccess={onSuccess}
			message={message}
			closeIcon={closeIcon}
		/>
	)
}

export default ModalContactForm
