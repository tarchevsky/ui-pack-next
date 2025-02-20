import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/utils/storage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { formFields } from '../formFields'
import type { IQuizInput } from '../quiz.types'

const FORM_DATA_EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 часа

const clearExpiredFormData = () => {
	const savedFormData = getStorageItem(STORAGE_KEYS.FORM_DATA)
	if (!savedFormData) return

	try {
		const { timestamp } = JSON.parse(savedFormData)
		if (timestamp && Date.now() - timestamp > FORM_DATA_EXPIRY_TIME) {
			// Очищаем все данные формы
			localStorage.removeItem(STORAGE_KEYS.FORM_DATA)
			localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP)
			formFields.forEach(field => {
				if (field.type === 'radio') {
					localStorage.removeItem(
						`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`
					)
				}
			})
		}
	} catch (error) {
		console.error('Error parsing form data:', error)
	}
}

export const useQuizForm = () => {
	const isClient = typeof window !== 'undefined'

	// Очищаем устаревшие данные при инициализации
	useEffect(() => {
		if (isClient) {
			clearExpiredFormData()
		}
	}, [isClient])

	const savedFormData = isClient ? getStorageItem(STORAGE_KEYS.FORM_DATA) : null
	const initialValues = savedFormData
		? JSON.parse(savedFormData).data || {}
		: {}

	// Добавляем восстановление значений для radio полей
	formFields.forEach(field => {
		if (field.type === 'radio') {
			const savedRadioValue = getStorageItem(
				`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`
			)
			if (savedRadioValue) {
				initialValues[field.name] = savedRadioValue
			}
		}
	})

	const defaultValues: IQuizInput = formFields.reduce((acc, field) => {
		acc[field.name as keyof IQuizInput] = initialValues[field.name] || ''
		return acc
	}, {} as IQuizInput)

	const form = useForm<IQuizInput>({
		defaultValues,
		mode: 'onChange'
	})

	useEffect(() => {
		if (!isClient) return

		const subscription = form.watch(data => {
			const hasValues = Object.values(data).some(value =>
				Array.isArray(value) ? value.length > 0 : Boolean(value)
			)

			if (hasValues) {
				setStorageItem(
					STORAGE_KEYS.FORM_DATA,
					JSON.stringify({
						data,
						timestamp: Date.now()
					})
				)
			}
		})

		return () => subscription.unsubscribe()
	}, [form.watch, isClient])

	return form
}
