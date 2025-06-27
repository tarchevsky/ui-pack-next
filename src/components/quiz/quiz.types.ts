export type OptionType = {
	label?: string
	value: string
}

export interface FormField {
	name: string
	step?: number | undefined
	type:
		| 'text'
		| 'email'
		| 'tel'
		| 'radio'
		| 'checkbox'
		| 'textarea'
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
	privacyLink?: string
	privacyLinkText?: string
}

export type FormFieldName = string

export interface IQuizInput {
	[key: string]: string | string[] | File[]
}

export interface FieldRenderProps {
	field: FormField
	register: any
	errors: any
	control?: any
	setError?: any
	clearErrors?: any
	trigger?: (name: string) => Promise<boolean>
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
