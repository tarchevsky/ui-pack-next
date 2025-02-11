import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface TextFieldProps {
	field: FormField
	register: any
	errors: any
}

const TextField: React.FC<TextFieldProps> = ({ field, register, errors }) => {
	return (
		<>
			<input
				type={field.type}
				id={field.name}
				{...register(field.name, {
					required: field.required,
					validate: (value: string) => {
						if (!field.required && !value) return true

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
}

export default TextField
