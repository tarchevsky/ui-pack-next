export const STORAGE_KEYS = {
	FORM_DATA: 'quizFormData',
	CURRENT_STEP: 'quizCurrentStep',
	CONTACT_FORM_DATA: 'contactFormData',
	QUIZ_FORM_DATA: 'quizRadioData'
} as const

// Максимальный размер данных в localStorage (5MB)
const MAX_STORAGE_SIZE = 5 * 1024 * 1024

const getStorageSize = () => {
	let total = 0
	for (const key in localStorage) {
		if (localStorage.hasOwnProperty(key)) {
			total += (localStorage[key].length + key.length) * 2
		}
	}
	return total
}

export const getStorageItem = (key: string) => {
	if (typeof window === 'undefined') return null
	try {
		return localStorage.getItem(key)
	} catch (error) {
		console.error(`Error getting item from localStorage: ${error}`)
		return null
	}
}

export const setStorageItem = (key: string, value: string) => {
	if (typeof window === 'undefined') return
	try {
		// Проверяем размер новых данных
		const newDataSize = (key.length + value.length) * 2
		const currentSize = getStorageSize()

		if (currentSize + newDataSize > MAX_STORAGE_SIZE) {
			console.warn('Storage quota would be exceeded, clearing old data')
			localStorage.clear()
		}

		localStorage.setItem(key, value)
	} catch (error) {
		console.error(`Error setting item to localStorage: ${error}`)
		if (error instanceof Error && error.name === 'QuotaExceededError') {
			try {
				localStorage.clear()
				localStorage.setItem(key, value)
			} catch (innerError) {
				console.error(`Error clearing localStorage: ${innerError}`)
			}
		}
	}
}

export const removeStorageItem = (key: string) => {
	if (typeof window === 'undefined') return
	try {
		localStorage.removeItem(key)
	} catch (error) {
		console.error(`Error removing item from localStorage: ${error}`)
	}
}
