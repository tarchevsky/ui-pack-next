import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface CheckboxFieldProps {
	field: FormField
	register: any
	errors: any
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
	field,
	register,
	errors
}) => {
	if (!field.options) return null

	return (
		<>
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
								validate: (value: string[] | undefined) => {
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
			</div>
			<ErrorMessage
				message={
					errors[field.name] ? field.error || 'Это поле обязательно' : undefined
				}
			/>
		</>
	)
}

export default CheckboxField
