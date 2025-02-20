export const useLocalStorage = () => {
	const setItem = (key: string, value: string) => {
		try {
			localStorage.setItem(key, value)
		} catch (error) {
			console.error('Error saving to localStorage:', error)
		}
	}

	const getItem = (key: string) => {
		try {
			return localStorage.getItem(key)
		} catch (error) {
			console.error('Error reading from localStorage:', error)
			return null
		}
	}

	const removeItem = (key: string) => {
		try {
			localStorage.removeItem(key)
		} catch (error) {
			console.error('Error removing from localStorage:', error)
		}
	}

	return { setItem, getItem, removeItem }
}
