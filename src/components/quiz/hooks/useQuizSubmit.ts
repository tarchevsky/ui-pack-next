import { STORAGE_KEYS, removeStorageItem } from '@/utils/storage'
import { useState } from 'react'
import { formFields } from '../formFields'
import type { IQuizInput } from '../quiz.types'

export const useQuizSubmit = (
	reset: () => void,
	setCurrentStep: (step: number) => void
) => {
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (data: IQuizInput, onSuccess: () => void) => {
		try {
			setIsSubmitting(true)
			setSubmitError(null)

			// Обрабатываем все поля формы
			const formDataObj: Record<string, any> = {}

			await Promise.all(
				Object.keys(data).map(async key => {
					if (key === 'resume' && data[key]?.[0]) {
						const file = data[key][0] as File
						const base64Data = await new Promise(resolve => {
							const reader = new FileReader()
							reader.onloadend = () => resolve(reader.result)
							reader.readAsDataURL(file)
						})

						formDataObj.resume = {
							name: file.name,
							type: file.type,
							data: base64Data
						}
					} else {
						formDataObj[key] = data[key]
					}
				})
			)

			const res = await fetch('/api/quiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formDataObj)
			})

			const result = await res.json()
			if (result.success) {
				onSuccess()
				removeStorageItem(STORAGE_KEYS.FORM_DATA)
				removeStorageItem(STORAGE_KEYS.CURRENT_STEP)

				// Создаем пустые значения для всех полей формы
				const emptyValues = formFields.reduce(
					(acc, field) => {
						acc[field.name] = field.type === 'file' ? [] : ''
						return acc
					},
					{} as Record<string, any>
				)

				reset() // Сначала сбрасываем форму
				setCurrentStep(1) // Затем возвращаемся к первому шагу
			} else {
				setSubmitError(result.message || 'Не удалось отправить сообщение')
			}
		} catch (error) {
			setSubmitError('Произошла ошибка при отправке формы')
			console.error('Submit error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		handleSubmit,
		submitError,
		isSubmitting
	}
}
