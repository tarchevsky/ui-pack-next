import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/utils/storage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { IFormInput } from './contactForm.types'
import { formFields } from './formFields'

const FORM_DATA_EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 часа
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const clearExpiredFormData = () => {
	const savedFormData = getStorageItem(STORAGE_KEYS.CONTACT_FORM_DATA)
	if (!savedFormData) return

	try {
		const { timestamp } = JSON.parse(savedFormData)
		if (timestamp && Date.now() - timestamp > FORM_DATA_EXPIRY_TIME) {
			localStorage.removeItem(STORAGE_KEYS.CONTACT_FORM_DATA)
		}
	} catch (error) {
		console.error('Error parsing form data:', error)
	}
}

export const useFormValidation = () => {
	const isClient = typeof window !== 'undefined'

	const form = useForm<IFormInput>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			message: '',
			captcha: '',
			agreement: false,
			pizzaOpinion: ''
		},
		mode: 'onChange'
	})

	useEffect(() => {
		formFields.forEach(field => {
			form.register(field.name, {
				required:
					field.required && field.type !== 'captcha'
						? 'Это поле обязательно для заполнения'
						: false,
				pattern:
					field.pattern && field.error
						? {
								value: field.pattern,
								message: field.error
							}
						: undefined
			})
		})
	}, [form])

	useEffect(() => {
		if (isClient) {
			clearExpiredFormData()
			const savedFormData = getStorageItem(STORAGE_KEYS.CONTACT_FORM_DATA)
			if (savedFormData) {
				try {
					const { data } = JSON.parse(savedFormData)
					if (data) {
						form.reset(data)
					}
				} catch (error) {
					console.error('Error parsing form data:', error)
				}
			}
		}
	}, [isClient])

	useEffect(() => {
		if (!isClient) return

		const subscription = form.watch(data => {
			const hasValues = Object.values(data).some(value => {
				if (value instanceof FileList) {
					return value.length > 0
				}
				return Boolean(value)
			})

			if (hasValues) {
				const dataToSave = { ...data }
				// Не сохраняем FileList в localStorage
				Object.keys(dataToSave).forEach(key => {
					if (dataToSave[key] instanceof FileList) {
						delete dataToSave[key]
					}
				})

				setStorageItem(
					STORAGE_KEYS.CONTACT_FORM_DATA,
					JSON.stringify({
						data: dataToSave,
						timestamp: Date.now()
					})
				)
			}
		})

		return () => subscription.unsubscribe()
	}, [form.watch, isClient])

	return form
}
