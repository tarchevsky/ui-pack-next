import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/utils/storage'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { FormField } from '../contactForm.types'

interface RadioFieldProps extends FormField {
	value: string
	onChange: (value: string) => void
	error?: string
	resetTrigger?: boolean
	privacyLink?: string
	privacyLinkText?: string
}

export const RadioField = ({
	name,
	label,
	title,
	options = [],
	value,
	onChange,
	error,
	other = false,
	otherPlaceholder = 'Введите свой вариант',
	resetTrigger = false,
	privacyLink,
	privacyLinkText = '(Политика конфиденциальности)'
}: RadioFieldProps) => {
	const [showOther, setShowOther] = useState(false)
	const [otherValue, setOtherValue] = useState('')
	const { setItem, getItem, removeItem } = useLocalStorage()

	useEffect(() => {
		const savedValue = getItem(name)
		if (savedValue) {
			if (options.some(opt => opt.value === savedValue)) {
				onChange(savedValue)
			} else {
				setShowOther(true)
				setOtherValue(savedValue)
				onChange(savedValue)
			}
		}
	}, [])

	useEffect(() => {
		if (value) {
			setItem(name, value)
		}
	}, [value])

	// Очистка при успешной отправке формы
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

	// Добавляем эффект для сброса при изменении resetTrigger
	useEffect(() => {
		if (resetTrigger) {
			setShowOther(false)
			setOtherValue('')
		}
	}, [resetTrigger])

	const handleOptionChange = (optionValue: string) => {
		if (optionValue === 'other') {
			setShowOther(true)
			onChange(otherValue || '')
		} else {
			setShowOther(false)
			setOtherValue('')
			onChange(optionValue)
		}
	}

	const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setOtherValue(newValue)
		onChange(newValue)
	}

	return (
		<div
			className='form-control'
			role='radiogroup'
			aria-labelledby={`${name}-title`}
		>
			<div className='flex flex-col gap-2'>
				{options.map(option => (
					<label
						key={option.value}
						className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'
					>
						<input
							type='radio'
							name={name}
							value={option.value}
							checked={!showOther && value === option.value}
							onChange={() => handleOptionChange(option.value)}
							className='radio'
							aria-label={option.label}
						/>
						<span className='label-text'>
							{option.label || option.value}
							{privacyLink && option.value === 'agree' && (
								<Link
									href={privacyLink}
									className='ml-1 text-blue-600 underline'
									target='_blank'
									rel='noopener noreferrer'
								>
									{privacyLinkText}
								</Link>
							)}
						</span>
					</label>
				))}
				{other && (
					<div className='flex flex-col gap-2'>
						<label className='label flex flex-row justify-start gap-4 cursor-pointer hover:bg-base-200 rounded-lg transition-colors px-4'>
							<input
								type='radio'
								name={name}
								value='other'
								checked={showOther}
								onChange={() => handleOptionChange('other')}
								className='radio'
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
