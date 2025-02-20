import type { FC } from 'react'
import Captcha from './fields/Captcha'
import CheckboxField from './fields/CheckboxField'
import FileField from './fields/FileField'
import RadioField from './fields/RadioField'
import SelectField from './fields/SelectField'
import TelField from './fields/TelField'
import TextareaField from './fields/TextareaField'
import TextField from './fields/TextField'
import type { FieldRenderProps } from './quiz.types'

const FieldRender: FC<FieldRenderProps> = ({
	field,
	register,
	errors,
	control,
	setError,
	clearErrors,
	trigger
}) => {
	switch (field.type) {
		case 'tel':
			return <TelField field={field} control={control} errors={errors} />
		case 'text':
		case 'email':
			return <TextField field={field} register={register} errors={errors} />
		case 'textarea':
			return <TextareaField field={field} register={register} errors={errors} />
		case 'radio':
			return <RadioField field={field} register={register} errors={errors} />
		case 'checkbox':
			return <CheckboxField field={field} register={register} errors={errors} />
		case 'select':
			return <SelectField field={field} register={register} errors={errors} />
		case 'file':
			return <FileField field={field} register={register} errors={errors} />
		case 'captcha':
			return (
				<Captcha
					register={register}
					error={errors[field.name]?.message as string}
					setError={setError}
					clearErrors={clearErrors}
				/>
			)
		default:
			return null
	}
}

export default FieldRender
