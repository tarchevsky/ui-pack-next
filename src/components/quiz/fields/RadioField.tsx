import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface RadioFieldProps {
	field: FormField
	register: any
	errors: any
}

const RadioField: React.FC<RadioFieldProps> = ({ field, register, errors }) => {
	if (!field.options) return null

	return (
		<>
			<div
				className='form-control'
				role='radiogroup'
				aria-labelledby={`${field.name}-title`}
			>
				<div id={`${field.name}-title`} className='font-medium mb-2'>
					{field.title}
				</div>
				{field.options.map(option => (
					<label
						key={option.value}
						className='label cursor-pointer hover:bg-base-200 rounded-lg transition-colors'
					>
						<span className='label-text'>{option.label}</span>
						<input
							type='radio'
							value={option.value}
							{...register(field.name, {
								required: field.required,
								validate: (value: string) => {
									if (!value && field.required) {
										return field.error || 'Это поле обязательно'
									}
									return true
								}
							})}
							className='radio'
							aria-label={option.label}
						/>
					</label>
				))}
			</div>
			<ErrorMessage
				message={
					errors[field.name]
						? typeof errors[field.name].message === 'string'
							? errors[field.name].message
							: field.error || 'Это поле обязательно'
						: undefined
				}
			/>
		</>
	)
}

export default RadioField
