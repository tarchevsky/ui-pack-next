import { FieldRenderProps } from './quiz.types'
import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

const FieldRender: FC<FieldRenderProps> = ({
	field,
	register,
	errors,
	control
}) => {
	switch (field.type) {
		case 'tel':
			return (
				<>
					<Controller
						name={field.name}
						control={control}
						rules={{
							required: field.required,
							validate: value => {
								// Проверка на корректность номера телефона
								const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
								return (
									phoneRegex.test(value) || 'Введите корректный номер телефона'
								)
							}
						}}
						render={({ field: { onChange, value } }) => (
							<input
								type='tel'
								id={field.name}
								value={value || ''}
								required={field.required}
								onChange={e => {
									const formattedValue = formatPhoneNumber(e.target.value)
									onChange(formattedValue)
								}}
								placeholder={field.placeholder}
								className='input input-bordered w-full'
							/>
						)}
					/>
					{errors[field.name] && (
						<span className='error-message'>
							{field.error || 'Это поле обязательно'}
						</span>
					)}
				</>
			)
		case 'text':
		case 'email':
			return (
				<>
					<input
						type={field.type}
						id={field.name}
						{...register(field.name, { required: field.required })}
						required={field.required}
						placeholder={field.placeholder}
						className='input input-bordered w-full'
					/>
					{errors[field.name] && (
						<span className='error-message'>
							{field.error || 'Это поле обязательно'}
						</span>
					)}
				</>
			)
		case 'radio':
			if (!field.options) {
				return null // или какой-то другой обработчик ошибки
			}
			return (
				<div className='form-control'>
					<div>{field.title}</div>
					{field.options.map(option => (
						<label key={option.value} className='label cursor-pointer'>
							<span className='label-text'>{option.label}</span>
							<input
								type='radio'
								value={option.value}
								required={field.required}
								{...register(field.name, { required: field.required })}
								className='radio'
							/>
						</label>
					))}
					{errors[field.name] && (
						<span className='error-message'>
							{field.error || 'Это поле обязательно'}
						</span>
					)}
				</div>
			)
		case 'textarea':
			return (
				<div>
					<label key={field.value}></label>
					<textarea
						id={field.name}
						value={field.value}
						{...register(field.name, { required: field.required })}
						placeholder={field.placeholder}
						required={field.required}
						className='textarea textarea-bordered w-full'
					></textarea>
					{errors[field.name] && (
						<span className='error-message'>
							{field.error || 'Это поле обязательно'}
						</span>
					)}
				</div>
			)
		default:
			return null
	}
}

export default FieldRender
