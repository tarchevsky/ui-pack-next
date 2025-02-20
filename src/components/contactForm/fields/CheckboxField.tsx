import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/utils/storage'
import { useEffect, useState } from 'react'
import type { FormField } from '../contactForm.types'

interface CheckboxFieldProps extends FormField {
	value: string[]
	onChange: (value: string[]) => void
	error?: string
	resetTrigger?: boolean
}

export const CheckboxField = ({
	name,
	label,
	title,
	options = [],
	value,
	onChange,
	error,
	other = false,
	otherPlaceholder = 'Введите свой вариант',
	resetTrigger = false
}: CheckboxFieldProps) => {
	const [showOther, setShowOther] = useState(false)
	const [otherValue, setOtherValue] = useState('')
	const { setItem, getItem, removeItem } = useLocalStorage()

	useEffect(() => {
		const savedValue = getItem(name)
		if (savedValue) {
			try {
				const parsedValue = JSON.parse(savedValue)
				if (Array.isArray(parsedValue)) {
					const standardValues = parsedValue.filter(val =>
						options.some(opt => opt.value === val)
					)
					const otherValues = parsedValue.filter(
						val => !options.some(opt => opt.value === val)
					)

					if (otherValues.length > 0) {
						setShowOther(true)
						setOtherValue(otherValues[0])
					}

					onChange([...standardValues, ...otherValues])
				}
			} catch (e) {
				console.error('Error parsing saved checkbox values:', e)
			}
		}
	}, [])

	useEffect(() => {
		if (value.length > 0) {
			setItem(name, JSON.stringify(value))
		} else {
			removeItem(name)
		}
	}, [value])

	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === STORAGE_KEYS.CONTACT_FORM_DATA && !e.newValue) {
				setShowOther(false)
				setOtherValue('')
				removeItem(name)
			}
		}

		window.addEventListener('storage', handleStorageChange)
		return () => window.removeEventListener('storage', handleStorageChange)
	}, [name])

	useEffect(() => {
		if (resetTrigger) {
			setShowOther(false)
			setOtherValue('')
		}
	}, [resetTrigger])

	const handleOptionChange = (optionValue: string, checked: boolean) => {
		if (optionValue === 'other') {
			setShowOther(checked)
			if (checked && otherValue) {
				onChange([...value.filter(v => v !== otherValue), otherValue])
			} else {
				onChange(value.filter(v => options.some(opt => opt.value === v)))
			}
		} else {
			if (checked) {
				onChange([...value, optionValue])
			} else {
				onChange(value.filter(v => v !== optionValue))
			}
		}
	}

	const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setOtherValue(newValue)
		const filteredValue = value.filter(v =>
			options.some(opt => opt.value === v)
		)
		if (newValue) {
			onChange([...filteredValue, newValue])
		} else {
			onChange(filteredValue)
		}
	}

	return (
		<div
			className='form-control'
			role='group'
			aria-labelledby={`${name}-title`}
		>
			<div id={`${name}-title`} className='font-medium mb-2'>
				{title}
			</div>
			<div className='flex flex-col gap-2'>
				{options.map(option => (
					<label
						key={option.value}
						className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'
					>
						<input
							type='checkbox'
							name={name}
							value={option.value}
							checked={value.includes(option.value)}
							onChange={e => handleOptionChange(option.value, e.target.checked)}
							className='checkbox'
							aria-label={option.label}
						/>
						<span className='label-text'>{option.label || option.value}</span>
					</label>
				))}
				{other && (
					<div className='flex flex-col gap-2'>
						<label className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'>
							<input
								type='checkbox'
								name={name}
								value='other'
								checked={showOther}
								onChange={e => handleOptionChange('other', e.target.checked)}
								className='checkbox'
							/>
							<span className='label-text'>Другое</span>
						</label>
						{showOther && (
							<input
								type='text'
								value={otherValue}
								onChange={handleOtherChange}
								placeholder={otherPlaceholder}
								className='input input-bordered mt-2'
							/>
						)}
					</div>
				)}
			</div>
			{error && <span className='text-error text-sm mt-2'>{error}</span>}
		</div>
	)
}
