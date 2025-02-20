import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/utils/storage'
import { useEffect, useState } from 'react'
import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface CheckboxFieldProps {
	field: FormField
	register: any
	errors: any
}

const CheckboxField = ({ field, register, errors }: CheckboxFieldProps) => {
	const [selectedValues, setSelectedValues] = useState<string[]>([])
	const [showOther, setShowOther] = useState(false)
	const [otherValue, setOtherValue] = useState('')
	const [otherTouched, setOtherTouched] = useState(false)
	const { setItem, getItem, removeItem } = useLocalStorage()

	useEffect(() => {
		const savedValues = getItem(`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`)
		const savedIsOther = getItem(
			`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_isOther`
		)
		const savedOtherValue = getItem(
			`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_otherValue`
		)

		if (savedValues) {
			try {
				const parsedValues = JSON.parse(savedValues)
				setSelectedValues(parsedValues)

				if (savedIsOther === 'true' && savedOtherValue) {
					setShowOther(true)
					setOtherValue(savedOtherValue)
					register(field.name).onChange({
						target: {
							name: field.name,
							value: [...parsedValues, savedOtherValue]
						}
					})
				} else {
					register(field.name).onChange({
						target: { name: field.name, value: parsedValues }
					})
				}
			} catch (error) {
				console.error('Error parsing saved values:', error)
			}
		}
	}, [])

	useEffect(() => {
		if (selectedValues.length > 0) {
			setItem(
				`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`,
				JSON.stringify(selectedValues)
			)
			setItem(
				`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_isOther`,
				showOther.toString()
			)
			if (showOther) {
				setItem(
					`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_otherValue`,
					otherValue
				)
			}
		}
	}, [selectedValues, otherValue, showOther])

	const handleOptionChange = (optionValue: string) => {
		let newValues: string[]

		if (optionValue === 'other') {
			if (!showOther) {
				setShowOther(true)
				setOtherTouched(false)
				newValues = [...selectedValues]
				if (otherValue) {
					newValues.push(otherValue)
				}
			} else {
				setShowOther(false)
				setOtherValue('')
				setOtherTouched(false)
				newValues = selectedValues.filter(value => value !== otherValue)
			}
		} else {
			if (selectedValues.includes(optionValue)) {
				newValues = selectedValues.filter(value => value !== optionValue)
			} else {
				newValues = [...selectedValues, optionValue]
			}
		}

		setSelectedValues(newValues)
		register(field.name).onChange({
			target: { name: field.name, value: newValues }
		})
	}

	const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setOtherValue(newValue)
		setOtherTouched(true)

		const filteredValues = selectedValues.filter(value => value !== otherValue)
		const newValues = newValue ? [...filteredValues, newValue] : filteredValues

		setSelectedValues(filteredValues)
		register(field.name).onChange({
			target: { name: field.name, value: newValues }
		})
	}

	const { onChange, ...rest } = register(field.name, {
		required: field.required ? field.error || 'Это поле обязательно' : false,
		validate: (value: string[]) => {
			if (!field.required) return true

			if (!value || value.length === 0) {
				return field.error || 'Выберите хотя бы один вариант'
			}

			if (showOther && (!otherValue || otherValue.trim() === '')) {
				return 'Пожалуйста, укажите значение'
			}

			return true
		}
	})

	return (
		<div
			className='form-control'
			role='group'
			aria-labelledby={`${field.name}-title`}
		>
			{field.title && (
				<div id={`${field.name}-title`} className='font-medium mb-2'>
					{field.title}
				</div>
			)}
			<div className='flex flex-col gap-2'>
				{field.options?.map(option => (
					<label
						key={option.value}
						className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'
					>
						<input
							type='checkbox'
							name={field.name}
							value={option.value}
							checked={selectedValues.includes(option.value)}
							onChange={() => handleOptionChange(option.value)}
							className='checkbox'
							aria-label={option.label}
							{...rest}
						/>
						<span className='label-text'>{option.label || option.value}</span>
					</label>
				))}
				{field.other && (
					<div className='flex flex-col gap-2'>
						<label className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'>
							<input
								type='checkbox'
								name={field.name}
								value='other'
								checked={showOther}
								onChange={() => handleOptionChange('other')}
								className='checkbox'
								{...rest}
							/>
							<span className='label-text'>Другое</span>
						</label>
						{showOther && (
							<input
								type='text'
								value={otherValue}
								onChange={handleOtherChange}
								placeholder={field.otherPlaceholder}
								className='input input-bordered mt-2'
							/>
						)}
					</div>
				)}
			</div>
			{errors[field.name] && (
				<ErrorMessage message={errors[field.name].message as string} />
			)}
		</div>
	)
}

export default CheckboxField
