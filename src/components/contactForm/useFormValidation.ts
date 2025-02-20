import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/utils/storage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { IFormInput } from './contactForm.types'

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
		mode: 'onChange'
	})

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
			// Фильтруем объект, оставляя только непустые значения
			const filteredData = Object.entries(data).reduce(
				(acc, [key, value]) => {
					if (value instanceof FileList) {
						if (value.length > 0) {
							acc[key] = value
						}
					} else if (value) {
						acc[key] = value
					}
					return acc
				},
				{} as Record<string, any>
			)

			// Проверяем, есть ли непустые значения
			const hasValues = Object.keys(filteredData).length > 0

			if (hasValues) {
				setStorageItem(
					STORAGE_KEYS.CONTACT_FORM_DATA,
					JSON.stringify({
						data: filteredData,
						timestamp: Date.now()
					})
				)
			} else {
				// Если все значения пустые, удаляем данные из localStorage
				localStorage.removeItem(STORAGE_KEYS.CONTACT_FORM_DATA)
			}
		})

		return () => subscription.unsubscribe()
	}, [form.watch, isClient])

	return form
}
