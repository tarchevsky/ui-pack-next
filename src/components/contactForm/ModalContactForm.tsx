'use client'

import type { FormField } from '@/types/form.types'
import ContactForm from './ContactForm'

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
