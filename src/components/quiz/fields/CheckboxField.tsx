import { getStorageItem, setStorageItem } from '@/utils/storage'
import { useEffect, useState } from 'react'
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
		validate: (value: string[] | undefined) => {
			if (field.required) {
				if (!value) return field.error || 'Это поле обязательно'
				if (value.length === 0) {
					return field.error || 'Выберите хотя бы один вариант'
				}
			}
			return true
		}
	})

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedValues = Array.from(
			document.querySelectorAll(`input[name="${field.name}"]:checked`)
		)
			.map(checkbox => (checkbox as HTMLInputElement).value)
			.filter(value => value !== 'on')

		if (showCustomInput && customValue.trim()) {
			selectedValues.push(customValue)
		}

		onChange({
			target: {
				name: field.name,
				value: selectedValues
			}
		})
	}

	return (
		<>
			<div
				className='form-control'
				role='group'
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
							type='checkbox'
							value={option.value}
							onChange={handleCheckboxChange}
							name={field.name}
							{...rest}
							className='checkbox'
							aria-label={option.label}
						/>
					</label>
				))}
				{field.other && (
					<label className='label cursor-pointer hover:bg-base-200 rounded-lg transition-colors mt-2'>
						<span className='label-text'>Другое</span>
						<input
							type='checkbox'
							checked={showCustomInput}
							onChange={e => {
								setShowCustomInput(e.target.checked)
								if (!e.target.checked) {
									setCustomValue('')
									setStorageItem(customInputStorageKey, '')
								}
								handleCheckboxChange(e)
							}}
							className='checkbox'
						/>
					</label>
				)}
				{showCustomInput && field.other && (
					<input
						type='text'
						value={customValue}
						onChange={e => {
							const newValue = e.target.value
							handleCustomInputChange(e)
							onChange({
								target: {
									name: field.name,
									value: Array.from(
										document.querySelectorAll(
											`input[name="${field.name}"]:checked`
										)
									)
										.map(checkbox => (checkbox as HTMLInputElement).value)
										.filter(value => value !== 'on')
										.concat(newValue)
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

export default CheckboxField
