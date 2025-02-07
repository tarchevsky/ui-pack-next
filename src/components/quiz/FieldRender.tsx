import { FC } from 'react'
import CheckboxField from './fields/CheckboxField'
import FileField from './fields/FileField'
import RadioField from './fields/RadioField'
import SelectField from './fields/SelectField'
import TelField from './fields/TelField'
import TextareaField from './fields/TextareaField'
import TextField from './fields/TextField'
import { FieldRenderProps } from './quiz.types'

const FieldRender: FC<FieldRenderProps> = ({
	field,
	register,
	errors,
	control
}) => {
	switch (field.type) {
		case 'tel':
			return <TelField field={field} control={control} errors={errors} />
		case 'text':
		case 'email':
			return <TextField field={field} register={register} errors={errors} />
		case 'radio':
			return <RadioField field={field} register={register} errors={errors} />
		case 'textarea':
			return <TextareaField field={field} register={register} errors={errors} />
		case 'checkbox':
			return <CheckboxField field={field} register={register} errors={errors} />
		case 'select':
			return <SelectField field={field} register={register} errors={errors} />
		case 'file':
			return <FileField field={field} register={register} errors={errors} />
		default:
			return null
	}
}

export default FieldRender
