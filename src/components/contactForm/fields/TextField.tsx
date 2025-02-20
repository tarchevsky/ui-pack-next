import type { FieldRenderProps as QuizFieldRenderProps } from '../../quiz/quiz.types'
import type { FormField } from '../contactForm.types'

type FieldRenderProps = Omit<QuizFieldRenderProps, 'field'> & {
	field: FormField
}

type TextFieldProps = Pick<FieldRenderProps, 'field' | 'register' | 'errors'>

const TextField = ({ field, register, errors }: TextFieldProps) => {
	return (
		<div className='w-full'>
			<input
				type={field.type}
				id={field.name}
				{...register(field.name, {
					required: field.required,
					validate: (value: string | string[] | File[]) => {
						if (!field.required && !value) return true

						if (field.type === 'email' && typeof value === 'string') {
							const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
							return (
								emailRegex.test(value) || 'Пожалуйста, введите корректный email'
							)
						}
						return true
					}
				})}
				required={field.required}
				placeholder={field.placeholder}
				className='input input-bordered w-full'
			/>
			{errors[field.name] && (
				<span className='text-error text-sm'>
					{(errors[field.name]?.message as string) ||
						field.error ||
						'Это поле обязательно'}
				</span>
			)}
		</div>
	)
}

export default TextField
