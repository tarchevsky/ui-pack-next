import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/utils/storage'
import { useEffect, useState } from 'react'
import ErrorMessage from '../ErrorMessage'
import type { FormField } from '../quiz.types'

interface RadioFieldProps {
	field: FormField
	register: any
	errors: any
}

const RadioField = ({ field, register, errors }: RadioFieldProps) => {
	const [showOther, setShowOther] = useState(false)
	const [otherValue, setOtherValue] = useState('')
	const [otherTouched, setOtherTouched] = useState(false)
	const { setItem, getItem, removeItem } = useLocalStorage()
	const [value, setValue] = useState('')

	useEffect(() => {
		const savedValue = getItem(`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`)
		const savedIsOther = getItem(
			`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_isOther`
		)

		if (savedValue) {
			if (savedIsOther === 'true') {
				setShowOther(true)
				setOtherValue(savedValue)
				setValue('other')
				setTimeout(() => {
					register(field.name).onChange({
						target: { name: field.name, value: savedValue }
					})
				}, 0)
			} else if (field.options?.some(opt => opt.value === savedValue)) {
				setValue(savedValue)
				register(field.name).onChange({
					target: { name: field.name, value: savedValue }
				})
			}
		}
	}, [])

	useEffect(() => {
		if (value) {
			setItem(
				`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}`,
				showOther ? otherValue : value
			)
			setItem(
				`${STORAGE_KEYS.QUIZ_FORM_DATA}_${field.name}_isOther`,
				showOther.toString()
			)
		}
	}, [value, otherValue, showOther])

	const handleOptionChange = (optionValue: string) => {
		if (optionValue === 'other') {
			setShowOther(true)
			setValue(optionValue)
			setOtherTouched(false)
			register(field.name).onChange({
				target: { name: field.name, value: otherValue }
			})
		} else {
			setShowOther(false)
			setOtherValue('')
			setOtherTouched(false)
			setValue(optionValue)
			register(field.name).onChange({
				target: { name: field.name, value: optionValue }
			})
		}
	}

	const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setOtherValue(newValue)
		setOtherTouched(true)
		register(field.name).onChange({
			target: { name: field.name, value: newValue }
		})
	}

	const { onChange, ...rest } = register(field.name, {
		required: field.required ? field.error || 'Это поле обязательно' : false,
		validate: (value: string) => {
			if (!field.required) return true

			if (showOther) {
				if (!otherValue || otherValue.trim() === '') {
					return 'Пожалуйста, укажите значение'
				}
			}

			if (!value || value.trim() === '') {
				return field.error || 'Это поле обязательно'
			}

			return true
		}
	})

	return (
		<div
			className='form-control'
			role='radiogroup'
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
							type='radio'
							name={field.name}
							value={option.value}
							checked={!showOther && value === option.value}
							onChange={() => handleOptionChange(option.value)}
							className='radio'
							aria-label={option.label}
							{...rest}
						/>
						<span className='label-text'>
							{option.label || option.value}
							{field.privacyLink &&
								field.privacyLinkText &&
								option.value === 'agree' && (
									<>
										{' '}
										<a
											href={field.privacyLink}
											target='_blank'
											rel='noreferrer'
											className='text-primary hover:underline'
										>
											{field.privacyLinkText}
										</a>
									</>
								)}
						</span>
					</label>
				))}
				{field.other && (
					<div className='flex flex-col gap-2'>
						<label className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'>
							<input
								type='radio'
								name={field.name}
								value='other'
								checked={showOther}
								onChange={() => handleOptionChange('other')}
								className='radio'
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

export default RadioField
