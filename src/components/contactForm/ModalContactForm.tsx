'use client'

import type { FormField } from '@/types/form.types'
import ContactForm from './ContactForm'

interface ModalContactFormProps {
	fields: FormField[]
	onSuccess?: (message: string) => void
}

const ModalContactForm = ({ fields, onSuccess }: ModalContactFormProps) => {
	return <ContactForm fields={fields} useParentModal onSuccess={onSuccess} />
}

export default ModalContactForm
