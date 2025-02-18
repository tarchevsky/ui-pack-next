import type {
	Control,
	FieldErrors,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetError
} from 'react-hook-form'

export type OptionType = {
	label?: string
	value: string
}

export interface FormField {
	step: number
	name: string
	type:
		| 'text'
		| 'email'
		| 'tel'
		| 'radio'
		| 'textarea'
		| 'checkbox'
		| 'select'
		| 'file'
		| 'captcha'
	label?: string
	placeholder?: string
	required?: boolean
	title?: string
	error?: string
	options?: OptionType[]
	multiple?: boolean
	accept?: string
	maxSize?: number
	other?: boolean
	otherPlaceholder?: string
}

export type FormFieldName = string

export interface IQuizInput {
	[key: string]: string | string[] | File[]
}

export interface FieldRenderProps {
	field: FormField
	register: UseFormRegister<IQuizInput>
	errors: FieldErrors<IQuizInput>
	control: Control<IQuizInput>
	setError: UseFormSetError<IQuizInput>
	clearErrors: UseFormClearErrors<IQuizInput>
}

export interface StepNavigationProps {
	currentStep: number
	totalSteps: number
	prevStep: () => void
	nextStep: () => void
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
	isSubmitting: boolean
	showSteps?: boolean
}
