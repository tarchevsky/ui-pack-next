import { useLocalStorage } from '@/hooks/useLocalStorage'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { Controller } from 'react-hook-form'
import type { FormField } from '../contactForm.types'
import ErrorMessage from '../ErrorMessage'

interface TelFieldProps {
	field: FormField
	control: any
	errors: any
}

const TelField: React.FC<TelFieldProps> = ({ field, control, errors }) => {
	const { removeItem } = useLocalStorage()

	return (
		<div className='form-control w-full'>
			<Controller
				name={field.name}
				control={control}
				rules={{
					required: field.required,
					validate: value => {
						if (!field.required && !value) return true

						const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
						return phoneRegex.test(value) || 'Введите корректный номер телефона'
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
							if (!formattedValue) {
								removeItem(field.name)
							}
						}}
						placeholder={field.placeholder}
						className='input input-bordered w-full'
					/>
				)}
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
		</div>
	)
}

export default TelField
