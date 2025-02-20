import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import type {
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetError
} from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { formFields } from '../formFields'

interface CaptchaProps {
	register: UseFormRegister<any>
	error?: string
	setError: UseFormSetError<any>
	clearErrors: UseFormClearErrors<any>
}

export default function Captcha({
	register,
	error,
	setError,
	clearErrors
}: CaptchaProps) {
	const [numbers, setNumbers] = useState({ a: 0, b: 0 })
	const [isVisible, setIsVisible] = useState(true)
	const [captchaValue, setCaptchaValue] = useState('')

	const generateNumbers = () => {
		setIsVisible(false)
		setTimeout(() => {
			setNumbers({
				a: Math.floor(Math.random() * 10) + 1,
				b: Math.floor(Math.random() * 10) + 1
			})
			setIsVisible(true)
			setCaptchaValue('')
			clearErrors('captcha')
		}, 300)
	}

	useEffect(() => {
		generateNumbers()
	}, [])

	const validateCaptcha = (value: string) => {
		if (!value) {
			const captchaField = formFields.find(field => field.name === 'captcha')
			setError('captcha', { type: 'required', message: captchaField?.error })
			return
		}

		const numValue = parseInt(value)
		if (numValue === numbers.a + numbers.b) {
			clearErrors('captcha')
		} else {
			setError('captcha', { type: 'validate', message: 'Неверный ответ' })
		}
	}

	const handleIncrement = () => {
		const newValue = captchaValue === '' ? 1 : parseInt(captchaValue) + 1
		const stringValue = newValue.toString()
		setCaptchaValue(stringValue)
		validateCaptcha(stringValue)
	}

	const handleDecrement = () => {
		const newValue =
			captchaValue === '' ? 0 : Math.max(0, parseInt(captchaValue) - 1)
		const stringValue = newValue.toString()
		setCaptchaValue(stringValue)
		validateCaptcha(stringValue)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setCaptchaValue(value)
		validateCaptcha(value)
	}

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-4'>
				<span className='text-lg font-medium relative'>
					<span
						className={`inline-block transition-all duration-300 ${
							isVisible
								? 'opacity-100 transform translate-y-0'
								: 'opacity-0 transform -translate-y-2'
						}`}
					>
						{numbers.a} + {numbers.b} = ?
					</span>
				</span>
				<div className='relative flex items-center'>
					<input
						type='number'
						value={captchaValue}
						className='input input-bordered w-24 text-center font-medium text-lg pr-8 appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
						{...register('captcha', {
							required: formFields.find(field => field.name === 'captcha')
								?.error,
							validate: value =>
								parseInt(value) === numbers.a + numbers.b || 'Неверный ответ',
							onChange: e => handleChange(e)
						})}
					/>
					<div className='absolute right-1 top-1/2 -translate-y-1/2 flex flex-col'>
						<button
							type='button'
							onClick={handleIncrement}
							className='text-gray-500 hover:text-primary pr-2 leading-none'
						>
							<ChevronUp size={14} />
						</button>
						<button
							type='button'
							onClick={handleDecrement}
							className='text-gray-500 hover:text-primary pr-2 leading-none'
						>
							<ChevronDown size={14} />
						</button>
					</div>
				</div>
				<button
					type='button'
					onClick={generateNumbers}
					className='group p-2 transition-all duration-200'
				>
					<RotateCcw className='transition-transform group-hover:rotate-180 duration-500' />
				</button>
			</div>
			<ErrorMessage message={error} />
		</div>
	)
}
