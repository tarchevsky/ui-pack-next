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
			</div>
			<ErrorMessage
				message={
					errors[field.name] ? field.error || 'Это поле обязательно' : undefined
				}
			/>
		</>
	)
}

export default RadioField
