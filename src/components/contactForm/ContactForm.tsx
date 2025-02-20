'use client'
import type { ModalHandle } from '@/components/modal/modal.types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { removeStorageItem, STORAGE_KEYS } from '@/utils/storage'
import { lazy, useEffect, useRef, useState } from 'react'
import type { IFormInput } from './contactForm.types'
import FieldRender from './FieldRender'
import { formFields } from './formFields'
import { useFormValidation } from './useFormValidation'

const Modal = lazy(() => import('@/components/modal/Modal'))

interface IContactFormProps {
	title?: string
}

const ContactForm = () => {
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [resetCaptcha, setResetCaptcha] = useState(false)
	const [resetTrigger, setResetTrigger] = useState(false)
	const modalRef = useRef<ModalHandle>(null)
	const { removeItem } = useLocalStorage()
	const form = useFormValidation()
	const {
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		clearErrors
	} = form

	useEffect(() => {
		setIsLoading(false)
	}, [])

	const handleModalClose = () => {
		// Просто закрываем модальное окно без сброса формы
	}

	const onSubmit = async (data: IFormInput) => {
		try {
			setIsSubmitting(true)
			setSubmitError(null)

			const res = await fetch('/api/form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})

			const result = await res.json()

			if (result.success) {
				reset(
					{
						name: '',
						email: '',
						phone: '',
						message: '',
						topic: '',
						captcha: ''
					},
					{
						keepErrors: false,
						keepDirty: false,
						keepTouched: false,
						keepIsSubmitted: false,
						keepIsValid: false,
						keepDefaultValues: false
					}
				)
				clearErrors()
				setResetCaptcha(prev => !prev)
				setResetTrigger(prev => !prev)
				removeStorageItem(STORAGE_KEYS.CONTACT_FORM_DATA)

				// Очищаем все поля формы из localStorage
				formFields.forEach(field => {
					if (field.type === 'radio' || field.type === 'checkbox') {
						removeItem(field.name)
					}
				})

				modalRef.current?.showModal()
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

	return (
		<>
			{isLoading ? (
				<div className='flex justify-center items-center min-h-[200px]'>
					<div className='loading loading-spinner loading-lg'></div>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-4 w-full max-w-lg mx-auto'
				>
					{formFields.map(field => (
						<FieldRender
							key={field.name}
							field={field}
							form={form}
							errors={errors}
							resetCaptcha={resetCaptcha}
							resetTrigger={resetTrigger}
						/>
					))}

					{submitError && (
						<div className='alert alert-error'>
							<span>{submitError}</span>
						</div>
					)}

					<button
						type='submit'
						className='btn btn-primary w-full'
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Отправка...' : 'Отправить'}
					</button>

					<Modal
						ref={modalRef}
						message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
						onClose={handleModalClose}
					/>
				</form>
			)}
		</>
	)
}

export default ContactForm
