import { STORAGE_KEYS, removeStorageItem } from '@/utils/storage'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formFields } from '../formFields'
import type { IQuizInput } from '../quiz.types'

export const useQuizSubmit = (
	reset: () => void,
	setCurrentStep: (step: number) => void,
	form: ReturnType<typeof useForm<IQuizInput>>
) => {
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (data: IQuizInput, onSuccess: () => void) => {
		try {
			setIsSubmitting(true)
			setSubmitError(null)

			const fileFields = formFields
				.filter(field => field.type === 'file')
				.map(field => field.name)

			const formDataObj = await Object.entries(data).reduce(
				async (accPromise, [key, value]) => {
					const acc = await accPromise

					// Пропускаем поле captcha при отправке
					if (key === 'captcha') {
						return acc
					}

					if (fileFields.includes(key) && value?.[0]) {
						const file = value[0] as File
						const base64Data = await new Promise(resolve => {
							const reader = new FileReader()
							reader.onloadend = () => resolve(reader.result)
							reader.readAsDataURL(file)
						})

						acc[key] = {
							name: file.name,
							type: file.type,
							data: base64Data
						}
					} else if (fileFields.includes(key)) {
						acc[key] = null
					} else {
						acc[key] = value
					}
					return acc
				},
				Promise.resolve({} as Record<string, any>)
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

				formFields.forEach(field => {
					if (field.type === 'checkbox' || field.type === 'radio') {
						removeStorageItem(`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`)
						removeStorageItem(
							`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_isOther`
						)
						removeStorageItem(
							`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_otherValue`
						)
					}
				})

				const emptyValues = formFields.reduce(
					(acc, field) => {
						acc[field.name] =
							field.type === 'file' ? [] : field.type === 'checkbox' ? [] : ''
						return acc
					},
					{} as Record<string, any>
				)

				reset()
				form.reset(emptyValues)
				setCurrentStep(1)
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
