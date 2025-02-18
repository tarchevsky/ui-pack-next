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

		if (selectedValues.length === 0 && !showCustomInput) {
			setStorageItem(customInputStorageKey, '')
		}

		if (showCustomInput && customValue.trim() && e.target.checked) {
			selectedValues.push(customValue)
		}

		onChange({
			target: {
				name: field.name,
				value: selectedValues.length > 0 ? selectedValues : undefined
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
						className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'
					>
						<input
							type='checkbox'
							value={option.value}
							onChange={handleCheckboxChange}
							name={field.name}
							{...rest}
							className='checkbox'
							aria-label={option.label}
						/>
						<span className='label-text'>{option.label}</span>
					</label>
				))}
				{field.other && (
					<label className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'>
						<input
							type='checkbox'
							checked={showCustomInput}
							onChange={e => {
								const isChecked = e.target.checked
								if (!isChecked) {
									setCustomValue('')
									setStorageItem(customInputStorageKey, '')
								}
								setShowCustomInput(isChecked)
								handleCheckboxChange(e)
							}}
							className='checkbox'
						/>
						<span className='label-text'>Другое</span>
					</label>
				)}
				{showCustomInput && field.other && (
					<input
						type='text'
						value={customValue}
						onChange={e => {
							const newValue = e.target.value
							handleCustomInputChange(e)

							const selectedValues = Array.from(
								document.querySelectorAll(`input[name="${field.name}"]:checked`)
							)
								.map(checkbox => (checkbox as HTMLInputElement).value)
								.filter(value => value !== 'on')

							if (newValue.trim()) {
								selectedValues.push(newValue)
							}

							onChange({
								target: {
									name: field.name,
									value: selectedValues.length > 0 ? selectedValues : undefined
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
