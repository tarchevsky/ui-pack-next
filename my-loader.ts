import s3 from './aws-config'

export default function customLoader({
	src,
	width,
	quality
}: {
	src: string
	width: number
	quality?: number
}) {
	if (src.startsWith('/s3/')) {
		const fileName = src.replace('/s3/', '')
		const params = {
			Bucket: '73071a84-a970bae0-acc1-4b9c-b8c4-8ddf64d2549f',
			Key: `плейсхолдеры/${fileName}`,
			Expires: 60 // Время действия ссылки (в секундах)
		}

		try {
			// Генерация URL для доступа к изображению на Timeweb S3
			const url = s3.getSignedUrl('getObject', params)
			return `${url}&width=${width}&quality=${quality || 75}`
		} catch (error) {
			console.error('Error generating signed URL:', error)
			return src
		}
	} else {
		// Обработка локальных изображений
		return `${src}?w=${width}&q=${quality || 75}`
	}
}
