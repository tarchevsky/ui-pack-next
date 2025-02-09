import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { formFields } from '../formFields'
import type { IQuizInput } from '../quiz.types'
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storage'

export const useQuizForm = () => {
	// Проверяем, что мы на клиенте
	const isClient = typeof window !== 'undefined'

	// Получаем сохраненные данные только на клиенте
	const savedFormData = isClient ? getStorageItem(STORAGE_KEYS.FORM_DATA) : null
	const initialValues = savedFormData ? JSON.parse(savedFormData) : {}

	const defaultValues: IQuizInput = formFields.reduce((acc, field) => {
		acc[field.name as keyof IQuizInput] = initialValues[field.name] || ''
		return acc
	}, {} as IQuizInput)

	const form = useForm<IQuizInput>({
		defaultValues,
		mode: 'onChange'
	})

	// Сохраняем данные формы при их изменении только на клиенте
	useEffect(() => {
		if (!isClient) return

		const subscription = form.watch(data => {
			const hasValues = Object.values(data).some(value =>
				Array.isArray(value) ? value.length > 0 : Boolean(value)
			)

			if (hasValues) {
				setStorageItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(data))
			}
		})

		return () => subscription.unsubscribe()
	}, [form.watch, isClient])

	return form
}
