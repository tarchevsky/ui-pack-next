import FadeIn from '@/components/fadeIn/FadeIn'
import FieldRender from '@/components/quiz/FieldRender'
import StepNavigation from '@/components/quiz/StepNavigation'
import { SubmitHandler, useForm, FieldValues, Path } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { formFields } from './formFields'
import { FormField, IQuizInput } from '@/components/quiz/quiz.types'
import Modal from '@/components/modal/Modal'
import { ModalHandle } from '@/components/modal/modal.types'

export default function Quiz() {
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = Math.max(...formFields.map(field => field.step))

	const defaultValues: IQuizInput = formFields.reduce((acc, field) => {
		acc[field.name as keyof IQuizInput] = ''
		return acc
	}, {} as IQuizInput)

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		control,
		formState: { errors }
	} = useForm<IQuizInput>({
		defaultValues,
		mode: 'onChange'
	})

	useEffect(() => {
		const savedFormData = localStorage.getItem('quizFormData')
		if (savedFormData) {
			const parsedData = JSON.parse(savedFormData) as Partial<IQuizInput>
			formFields.forEach(field => {
				const fieldName = field.name as keyof IQuizInput
				if (fieldName in parsedData) {
					const fieldValue = parsedData[fieldName]
					if (fieldValue !== undefined) {
						setValue(
							fieldName as Path<IQuizInput>,
							fieldValue as FieldValues[Path<IQuizInput>]
						)
					}
				}
			})
		}
	}, [setValue])

	const watchedFields = watch()
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			localStorage.setItem('quizFormData', JSON.stringify(watchedFields))
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [watchedFields])

	const modalRef = useRef<ModalHandle>(null)

	const showModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal()
		}
	}

	const onSubmit: SubmitHandler<IQuizInput> = async data => {
		const res = await fetch('/api/quiz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		const result = await res.json()
		if (result.success) {
			showModal()
			localStorage.removeItem('quizFormData')
			reset() // Очистить форму после успешной отправки
		} else {
			alert('Failed to send message.')
		}
	}

	const nextStep = () => {
		if (validateCurrentStep()) {
			setCurrentStep(prevStep => prevStep + 1)
		} else {
			// Запустить валидацию для отображения ошибок
			handleSubmit(() => {})()
		}
	}

	const prevStep = () => {
		setCurrentStep(prevStep => prevStep - 1)
	}

	const validateCurrentStep = () => {
		const currentFields = formFields.filter(field => field.step === currentStep)
		const isValid = currentFields.every(field => {
			if (field.name === 'phone') {
				const phoneValue = watchedFields[field.name] as string
				return phoneValue && phoneValue.replace(/\D/g, '').length === 11 // 11 цифр, включая код страны
			}
			if (field.required) {
				return (
					watchedFields[field.name] && watchedFields[field.name].trim() !== ''
				)
			}
			return true
		})
		return isValid
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col justify-center gap-6 min-h-64'
			>
				{formFields
					.filter(field => field.step === currentStep)
					.map(field => (
						<FadeIn key={field.name} className='flex flex-col gap-4 mb-6'>
							<FieldRender
								field={field as FormField}
								register={register}
								errors={errors}
								control={control}
							/>
						</FadeIn>
					))}
				<StepNavigation
					currentStep={currentStep}
					totalSteps={totalSteps}
					prevStep={prevStep}
					nextStep={nextStep}
					onSubmit={handleSubmit(onSubmit)}
				/>
			</form>
			<Modal
				ref={modalRef}
				message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
			/>
		</>
	)
}
