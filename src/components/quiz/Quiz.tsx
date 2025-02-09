'use client'
import FadeIn from '@/components/fadeIn/FadeIn'
import type { ModalHandle } from '@/components/modal/modal.types'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import ErrorMessage from './ErrorMessage'
import FieldRender from './FieldRender'
import StepNavigation from './StepNavigation'
import { formFields } from './formFields'

import { useQuizForm } from './hooks/useQuizForm'
import { useQuizSteps } from './hooks/useQuizSteps'
import { useQuizSubmit } from './hooks/useQuizSubmit'
import { useFormValidation } from './useFormValidation'

const Modal = lazy(() => import('@/components/modal/Modal'))

export default function Quiz() {
	const [isMounted, setIsMounted] = useState(false)
	const form = useQuizForm()
	const { currentStep, totalSteps, nextStep, prevStep, setCurrentStep } =
		useQuizSteps()
	const { validateField } = useFormValidation()
	const modalRef = useRef<ModalHandle>(null)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const { handleSubmit, submitError, isSubmitting } = useQuizSubmit(() => {
		const emptyValues = formFields.reduce(
			(acc, field) => {
				acc[field.name] = field.type === 'file' ? [] : ''
				return acc
			},
			{} as Record<string, any>
		)
		form.reset(emptyValues)
	}, setCurrentStep)

	// Не рендерим ничего до монтирования на клиенте
	if (!isMounted) {
		return null
	}

	const validateCurrentStep = () => {
		const currentFields = formFields.filter(field => field.step === currentStep)
		return currentFields.every(field =>
			validateField(field, form.watch(field.name))
		)
	}

	const handleNextStep = () => {
		if (validateCurrentStep()) {
			nextStep()
		} else {
			form.handleSubmit(() => {})()
		}
	}

	const showModal = () => {
		modalRef.current?.showModal()
	}

	return (
		<>
			<form
				onSubmit={form.handleSubmit(data => handleSubmit(data, showModal))}
				className='w-full flex flex-col justify-center gap-6 min-h-64'
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
				/>
				<ErrorMessage message={submitError ?? undefined} className='mt-2' />
			</form>
			<Suspense fallback={null}>
				<Modal
					ref={modalRef}
					message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
				/>
			</Suspense>
		</>
	)
}
