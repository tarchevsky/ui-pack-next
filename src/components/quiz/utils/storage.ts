export const STORAGE_KEYS = {
	FORM_DATA: 'quizFormData',
	CURRENT_STEP: 'quizCurrentStep'
} as const

export const getStorageItem = (key: string) => {
	if (typeof window === 'undefined') return null
	return localStorage.getItem(key)
}

export const setStorageItem = (key: string, value: string) => {
	if (typeof window === 'undefined') return
	localStorage.setItem(key, value)
}

export const removeStorageItem = (key: string) => {
	if (typeof window === 'undefined') return
	localStorage.removeItem(key)
}
