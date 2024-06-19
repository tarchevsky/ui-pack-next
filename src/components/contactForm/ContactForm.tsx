import { useEffect, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IFormInput {
	name: string
	email: string
	phone: string
	message: string
}

export default function ContactForm() {
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

	const modalRef = useRef<HTMLDialogElement>(null)

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
			body: JSON.stringify(data)
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
					<input
						type='text'
						id='name'
						{...register('name', { required: true })}
						placeholder='Имя'
						className='input input-bordered w-full'
					/>
					{errors.name && <span>This field is required</span>}
					<input
						type='email'
						id='email'
						{...register('email', { required: true })}
						placeholder='Почта'
						className='input input-bordered w-full'
					/>
					{errors.email && <span>This field is required</span>}
				</div>
				<input
					type='tel'
					id='phone'
					{...register('phone', { required: true })}
					placeholder='Телефон'
					className='input input-bordered w-full'
				/>
				{errors.phone && <span>This field is required</span>}
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

			<dialog id='my_modal_1' ref={modalRef} className='modal'>
				<div className='modal-box'>
					<p className='py-4'>
						Ваше обращение отправлено! Спасибо за проявленный интерес!
					</p>
					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn'>Закрыть</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	)
}
