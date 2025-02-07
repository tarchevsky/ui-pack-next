import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import { FieldRenderProps } from './quiz.types'

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
					<ErrorMessage
						message={
							errors[field.name]
								? field.error || 'Это поле обязательно'
								: undefined
						}
					/>
				</>
			)
		case 'text':
		case 'email':
			return (
				<>
					<input
						type={field.type}
						id={field.name}
						{...register(field.name, {
							required: field.required,
							validate: value => {
								if (field.type === 'email') {
									const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
									return (
										typeof value === 'string' &&
										(emailRegex.test(value) ||
											'Пожалуйста, введите корректный email')
									)
								}
								return true
							}
						})}
						required={field.required}
						placeholder={field.placeholder}
						className='input input-bordered w-full'
					/>
					<ErrorMessage
						message={
							errors[field.name]
								? (errors[field.name]?.message as string) ||
									field.error ||
									'Это поле обязательно'
								: undefined
						}
					/>
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
					<ErrorMessage
						message={
							errors[field.name]
								? field.error || 'Это поле обязательно'
								: undefined
						}
					/>
				</div>
			)
		case 'textarea':
			return (
				<div>
					<textarea
						id={field.name}
						{...register(field.name, { required: field.required })}
						placeholder={field.placeholder}
						required={field.required}
						className='textarea textarea-bordered w-full'
					/>
					<ErrorMessage
						message={
							errors[field.name]
								? field.error || 'Это поле обязательно'
								: undefined
						}
					/>
				</div>
			)
		case 'checkbox':
			if (!field.options) return null
			return (
				<div className='form-control'>
					<div className='font-medium mb-2'>{field.title}</div>
					{field.options.map(option => (
						<label key={option.value} className='label cursor-pointer'>
							<span className='label-text'>{option.label}</span>
							<input
								type='checkbox'
								value={option.value}
								{...register(field.name, {
									required: field.required,
									validate: value => {
										if (field.required && Array.isArray(value)) {
											return value.length > 0 || field.error
										}
										return true
									}
								})}
								className='checkbox'
							/>
						</label>
					))}
					<ErrorMessage
						message={
							errors[field.name]
								? field.error || 'Это поле обязательно'
								: undefined
						}
					/>
				</div>
			)
		case 'select':
			if (!field.options) return null
			return (
				<div className='form-control'>
					<div className='font-medium mb-2'>{field.title}</div>
					<select
						{...register(field.name, { required: field.required })}
						className='select select-bordered w-full'
					>
						<option value=''>Выберите вариант</option>
						{field.options.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<ErrorMessage
						message={
							errors[field.name]
								? field.error || 'Это поле обязательно'
								: undefined
						}
					/>
				</div>
			)
		case 'file':
			return (
				<div className='form-control'>
					<div className='font-medium mb-2'>{field.title}</div>
					<input
						type='file'
						accept={field.accept}
						{...register(field.name, {
							required: field.required,
							validate: {
								fileSize: files => {
									if (!files?.[0] || !field.maxSize) return true
									return (
										typeof files[0] === 'object' &&
										'size' in files[0] &&
										(files[0].size <= field.maxSize ||
											`Файл должен быть меньше ${field.maxSize / 1024 / 1024}MB`)
									)
								}
							}
						})}
						className='file-input file-input-bordered w-full'
					/>
					<ErrorMessage
						message={
							errors[field.name]
								? errors[field.name]?.message ||
									field.error ||
									'Это поле обязательно'
								: undefined
						}
					/>
				</div>
			)
		default:
			return null
	}
}

export default FieldRender
