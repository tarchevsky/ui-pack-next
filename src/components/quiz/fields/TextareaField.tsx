import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface TextareaFieldProps {
	field: FormField
	register: any
	errors: any
}

const TextareaField: React.FC<TextareaFieldProps> = ({
	field,
	register,
	errors
}) => {
	return (
		<>
			<div>
				<textarea
					id={field.name}
					{...register(field.name, { required: field.required })}
					placeholder={field.placeholder}
					required={field.required}
					className='textarea textarea-bordered w-full text-base'
					style={{
						WebkitTextSizeAdjust: '100%'
					}}
					enterKeyHint='done'
				/>
			</div>
			<ErrorMessage
				message={
					errors[field.name] ? field.error || 'Это поле обязательно' : undefined
				}
			/>
		</>
	)
}

export default TextareaField
