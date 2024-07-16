export const formatPhoneNumber = (value: string) => {
	// Удаляем все нецифровые символы
	const number = value.replace(/\D/g, '')

	// Проверяем, начинается ли номер с 8 или 7
	const prefix = number.startsWith('8')
		? '+7'
		: number.startsWith('7')
			? '+7'
			: ''

	// Форматируем номер
	const formattedNumber = number
		.slice(1)
		.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4')

	return `${prefix} ${formattedNumber}`.trim()
}
