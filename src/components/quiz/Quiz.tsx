'use client'
import FadeIn from '@/components/fadeIn/FadeIn'
import type { ModalHandle } from '@/components/modal/modal.types'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import ErrorMessage from './ErrorMessage'
import FieldRender from './FieldRender'
import StepNavigation from './StepNavigation'
import { formFields } from './formFields'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/utils/storage'
import { useQuizForm } from './hooks/useQuizForm'
import { useQuizSteps } from './hooks/useQuizSteps'
import { useQuizSubmit } from './hooks/useQuizSubmit'
import { useFormValidation } from './useFormValidation'

const Modal = lazy(() => import('@/components/modal/Modal'))

export default function Quiz({
	steps = false,
	message,
	closeIcon
}: {
	steps?: boolean
	message?: string
	closeIcon?: boolean
} = {}) {
	const [isMounted, setIsMounted] = useState(false)
	const form = useQuizForm()
	const { currentStep, totalSteps, nextStep, prevStep, setCurrentStep } =
		useQuizSteps()
	const { validateField } = useFormValidation()
	const modalRef = useRef<ModalHandle>(null)
	const { removeItem } = useLocalStorage()

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const clearFormData = () => {
		// Очищаем данные формы
		formFields.forEach(field => {
			if (field.type === 'radio') {
				removeItem(`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`)
			}
		})
		removeItem(STORAGE_KEYS.FORM_DATA)
		removeItem(STORAGE_KEYS.CURRENT_STEP)
	}

	const { handleSubmit, submitError, isSubmitting } = useQuizSubmit(
		() => {
			clearFormData()
			form.reset()
			setCurrentStep(1)
		},
		setCurrentStep,
		form
	)

	// Не рендерим ничего до монтирования на клиенте
	if (!isMounted) {
		return null
	}

	const validateCurrentStep = () => {
		const currentFields = formFields.filter(
			field => field.step === currentStep && field.required
		)
		return currentFields.every(field =>
			validateField(field, form.watch(field.name))
		)
	}

	const handleNextStep = async () => {
		const currentFields = formFields
			.filter(field => field.step === currentStep)
			.map(field => field.name)

		const isValid = await form.trigger(currentFields)
		if (isValid) {
			nextStep()
		}
	}

	const showModal = () => modalRef.current?.showModal()

	return (
		<>
			<FadeIn className='md:max-w-2xl m-auto rounded p-10 md:p-20 my-10 relative md:shadow-xl'>
				{steps && (
					<div className='absolute -top-10 right-4 md:top-auto md:bottom-14 bottom md:left-20 text-4xl font-extrabold text-gray-200 dark:text-base-300'>
						{currentStep}/{totalSteps}
					</div>
				)}
				<form
					onSubmit={form.handleSubmit(data => handleSubmit(data, showModal))}
					className='relative w-full flex flex-col justify-center gap-6 min-h-64'
				>
					{formFields
						.filter(field => field.step === currentStep)
						.map(field => (
							<FadeIn key={field.name} className='flex flex-col gap-4'>
								<FieldRender
									field={field}
									register={form.register}
									errors={form.formState.errors}
									control={form.control}
									setError={form.setError}
									clearErrors={form.clearErrors}
									trigger={form.trigger}
								/>
							</FadeIn>
						))}
					<StepNavigation
						currentStep={currentStep}
						totalSteps={totalSteps}
						prevStep={prevStep}
						nextStep={handleNextStep}
						onSubmit={form.handleSubmit(data => handleSubmit(data, showModal))}
						isSubmitting={isSubmitting}
						showSteps={steps}
					/>
					<ErrorMessage message={submitError ?? undefined} className='mt-2' />
				</form>
			</FadeIn>
			<Suspense fallback={null}>
				<Modal
					ref={modalRef}
					message={
						message ||
						'Ваше обращение отправлено! Спасибо за проявленный интерес!'
					}
					closeIcon={closeIcon}
				/>
			</Suspense>
		</>
	)
}
