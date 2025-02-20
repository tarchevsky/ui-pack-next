import type { FieldErrors, UseFormReturn } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import type { FormField, IFormInput } from './contactForm.types'
import Captcha from './fields/Captcha'
import { CheckboxField } from './fields/CheckboxField'
import FileField from './fields/FileField'
import { RadioField } from './fields/RadioField'
import TelField from './fields/TelField'

export interface FieldRenderProps {
	field: FormField
	form: UseFormReturn<IFormInput>
	errors: FieldErrors<IFormInput>
	resetCaptcha?: boolean
	resetTrigger?: boolean
}

const FieldRender = ({
	field,
	form,
	errors,
	resetCaptcha,
	resetTrigger
}: FieldRenderProps) => {
	const { register, control, setError, clearErrors, watch } = form

	const renderInput = () => {
		switch (field.type) {
			case 'tel':
				return <TelField field={field} control={control} errors={errors} />

			case 'file':
				return <FileField field={field} register={register} errors={errors} />

			case 'checkbox':
				return (
					<CheckboxField
						{...field}
						value={(watch(field.name) as string[]) || []}
						onChange={value => form.setValue(field.name, value)}
						error={errors[field.name]?.message}
						resetTrigger={resetTrigger}
					/>
				)

			case 'radio':
				return (
					<RadioField
						{...field}
						value={(watch(field.name) as string) || ''}
						onChange={value => form.setValue(field.name, value)}
						error={errors[field.name]?.message}
						resetTrigger={resetTrigger}
					/>
				)

			case 'captcha':
				return (
					<Captcha
						register={register}
						errors={errors}
						setError={setError}
						clearErrors={clearErrors}
						onReset={() => {
							// Этот колбэк будет вызван при генерации новых чисел
						}}
						resetKey={resetCaptcha}
					/>
				)

			case 'textarea':
				return (
					<textarea
						placeholder={field.placeholder}
						{...register(field.name, {
							required: field.required
						})}
						className='textarea textarea-bordered w-full h-24'
					/>
				)

			default:
				const validationRules = {
					required: field.required && 'Это поле обязательно',
					...(field.pattern && {
						pattern: {
							value: new RegExp(field.pattern, field.patternFlags),
							message: field.error || 'Неверный формат'
						}
					})
				}

				return (
					<input
						type={field.type}
						placeholder={field.placeholder}
						{...register(field.name, validationRules)}
						className='input input-bordered w-full'
					/>
				)
		}
	}

	return (
		<div className='form-control w-full'>
			{field.type !== 'checkbox' && field.type !== 'captcha' && (
				<label className='label'>
					<span className='label-text'>{field.title}</span>
				</label>
			)}
			{renderInput()}
			{field.type !== 'tel' &&
				field.type !== 'captcha' &&
				field.type !== 'checkbox' &&
				field.type !== 'file' &&
				field.type !== 'radio' && (
					<ErrorMessage
						message={
							errors[field.name]
								? errors[field.name]?.message ||
									field.error ||
									'Это поле обязательно'
								: undefined
						}
					/>
				)}
		</div>
	)
}

export default FieldRender
