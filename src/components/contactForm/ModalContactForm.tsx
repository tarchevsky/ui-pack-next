'use client'

import type { FormField } from '@/types/form.types'
import ContactForm from './ContactForm'

interface ModalContactFormProps {
	fields: FormField[]
	onSuccess?: (message: string) => void
	message?: string
}

const ModalContactForm = ({
	fields,
	onSuccess,
	message
}: ModalContactFormProps) => {
	return (
		<ContactForm
			fields={fields}
			useParentModal
			onSuccess={onSuccess}
			message={message}
		/>
	)
}

export default ModalContactForm
