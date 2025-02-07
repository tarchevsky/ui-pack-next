import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { formFields } from '../formFields'
import type { IQuizInput } from '../quiz.types'
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '../utils/storage'

export const useQuizForm = () => {
	// Получаем сохраненные данные при инициализации
	const savedFormData = getStorageItem(STORAGE_KEYS.FORM_DATA)
	const initialValues = savedFormData ? JSON.parse(savedFormData) : {}

	const defaultValues: IQuizInput = formFields.reduce((acc, field) => {
		acc[field.name as keyof IQuizInput] = initialValues[field.name] || ''
		return acc
	}, {} as IQuizInput)

	const form = useForm<IQuizInput>({
		defaultValues,
		mode: 'onChange'
	})

	// Сохраняем данные формы при их изменении
	useEffect(() => {
		const subscription = form.watch(data => {
			// Проверяем, что форма не пустая перед сохранением
			const hasValues = Object.values(data).some(value =>
				Array.isArray(value) ? value.length > 0 : Boolean(value)
			)

			if (hasValues) {
				setStorageItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(data))
			}
		})

		return () => subscription.unsubscribe()
	}, [form.watch])

	return form
}
