export type OptionType = {
	label?: string
	value: string
}

export interface FormField {
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
	pattern?: string
	patternFlags?: string
	privacyLink?: string
	privacyLinkText?: string
}

export interface IFormInput {
	[key: string]:
		| string
		| string[]
		| File[]
		| boolean
		| FileList
		| null
		| undefined
	name: string
	email: string
	phone: string
	message: string
	topic: string
	interests: string[]
	captcha?: string
	files?: FileList
}

export interface FormErrors {
	[key: string]: {
		message?: string
	}
}
