import { getStorageItem, setStorageItem } from '@/utils/storage'
import { useEffect, useState } from 'react'
import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface RadioFieldProps {
	field: FormField
	register: any
	errors: any
}

const RadioField: React.FC<RadioFieldProps> = ({ field, register, errors }) => {
	const [showCustomInput, setShowCustomInput] = useState(false)
	const [customValue, setCustomValue] = useState('')
	const customInputStorageKey = `${field.name}_custom_input`

	useEffect(() => {
		const savedValue = getStorageItem(customInputStorageKey)
		if (savedValue) {
			setCustomValue(savedValue)
			setShowCustomInput(true)
		}
	}, [customInputStorageKey])

	const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setCustomValue(value)
		setStorageItem(customInputStorageKey, value)
	}

	if (!field.options) return null

	const { onChange, ...rest } = register(field.name, {
		required: field.required,
		validate: (value: string | undefined) => {
			if (!value && field.required) {
				return field.error || 'Это поле обязательно'
			}
			return true
		}
	})

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === 'other') {
			setShowCustomInput(true)
			onChange({
				target: {
					name: field.name,
					value: customValue
				}
			})
		} else {
			setShowCustomInput(false)
			setCustomValue('')
			setStorageItem(customInputStorageKey, '')
			onChange(e)
		}
	}

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
							onChange={handleRadioChange}
							name={field.name}
							{...rest}
							className='radio'
							aria-label={option.label}
						/>
					</label>
				))}
				{field.other && (
					<label className='label cursor-pointer hover:bg-base-200 rounded-lg transition-colors mt-2'>
						<span className='label-text'>Другое</span>
						<input
							type='radio'
							value='other'
							checked={showCustomInput}
							onChange={handleRadioChange}
							name={field.name}
							className='radio'
						/>
					</label>
				)}
				{showCustomInput && field.other && (
					<input
						type='text'
						value={customValue}
						onChange={e => {
							handleCustomInputChange(e)
							onChange({
								target: {
									name: field.name,
									value: e.target.value
								}
							})
						}}
						placeholder={field.otherPlaceholder}
						className='input input-bordered mt-2'
					/>
				)}
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
