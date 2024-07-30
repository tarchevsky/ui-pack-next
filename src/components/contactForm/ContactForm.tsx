import { useEffect, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Modal from '@/components/modal/Modal'
import { ModalHandle } from '@/components/modal/modal.types'

interface IContactFormProps {
	title?: string
}

interface IFormInput {
	name: string
	email: string
	phone: string
	message: string
}

export default function ContactForm({ title }: IContactFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors }
	} = useForm<IFormInput>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			message: ''
		}
	})

	useEffect(() => {
		const savedFormData = localStorage.getItem('contactFormData')
		if (savedFormData) {
			const parsedData = JSON.parse(savedFormData)
			setValue('name', parsedData.name)
			setValue('email', parsedData.email)
			setValue('phone', parsedData.phone)
			setValue('message', parsedData.message)
		}
	}, [setValue])

	const watchedFields = watch()
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			localStorage.setItem('contactFormData', JSON.stringify(watchedFields))
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [watchedFields])

	const onSubmit: SubmitHandler<IFormInput> = async data => {
		const res = await fetch('/api/form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...data, title })
		})

		const result = await res.json()
		if (result.success) {
			showModal()
			localStorage.removeItem('contactFormData')
			reset() // Очистить форму после успешной отправки
		} else {
			alert('Failed to send message.')
		}
	}

	const modalRef = useRef<ModalHandle>(null)

	const showModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal()
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-6'
			>
				<div className='flex gap-4'>
					<div className='w-full'>
						<input
							type='text'
							id='name'
							{...register('name', { required: true })}
							placeholder='Имя'
							className='input input-bordered w-full'
						/>
						{errors.name && <span>Введите своё имя</span>}
					</div>

					<div className='w-full'>
						<input
							type='email'
							id='email'
							{...register('email', { required: true })}
							placeholder='Почта'
							className='input input-bordered w-full'
						/>
						{errors.email && <span>Упс, вы забыли ввести почту</span>}
					</div>
				</div>

				<div className='w-full'>
					<input
						type='tel'
						id='phone'
						{...register('phone', { required: true })}
						placeholder='Телефон'
						className='input input-bordered w-full'
					/>
					{errors.phone && <span>Введите номер телефона</span>}
				</div>
				<textarea
					id='message'
					{...register('message')}
					placeholder='Сообщение'
					className='input input-bordered w-full p-3.5 h-24'
				></textarea>
				<button type='submit' className='btn btn-wide btn-primary'>
					Отправить
				</button>
			</form>

			<Modal
				ref={modalRef}
				message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
			/>
		</>
	)
}
