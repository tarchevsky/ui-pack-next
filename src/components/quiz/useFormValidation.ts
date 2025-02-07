import { FormField } from './quiz.types'

export const useFormValidation = () => {
	const validateField = (
		field: FormField,
		value: string | string[] | File[]
	): boolean => {
		if (!field.required && !value) return true

		switch (field.type) {
			case 'tel':
				if (typeof value !== 'string') return false
				return Boolean(value && value.replace(/\D/g, '').length === 11)

			case 'email':
				if (typeof value !== 'string') return false
				return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))

			case 'checkbox':
				if (!Array.isArray(value)) return false
				return value.length > 0

			case 'file':
				if (!(value instanceof FileList)) return false
				if (!value[0]) return false
				if (field.maxSize && value[0].size > field.maxSize) return false
				return true

			case 'text':
			case 'textarea':
			case 'radio':
			case 'select':
				if (typeof value !== 'string') return false
				return Boolean(value && value.trim() !== '')

			default:
				return false
		}
	}

	return { validateField }
}
