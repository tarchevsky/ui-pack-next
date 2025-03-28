interface BalloonStyle {
	balloonContentLayout?: string
	balloonPanelMaxMapArea?: number
	balloonAutoPan?: boolean
	openBalloonOnClick?: boolean
	hideIconOnBalloonOpen?: boolean
	balloonOffset?: number[]
}

interface IconStyle {
	iconLayout?: string
	iconImageHref?: string
	iconImageSize?: number[]
	iconImageOffset?: number[]
}

interface Marker {
	coordinates: number[]
	title?: string
	description?: string
	color?: string
	openByDefault?: boolean
	balloonStyle?: BalloonStyle
	iconStyle?: IconStyle
}

interface ClustererOptions {
	/** Префикс для стиля кластеров */
	preset?: string
	/** Отключить зум при клике на кластер */
	clusterDisableClickZoom?: boolean
	/** Минимальное количество меток для кластеризации */
	minClusterSize?: number
	/** Отступ меток от границ кластера */
	margin?: number[]
}

export interface YandexMapProps {
	/** Координаты центра карты [широта, долгота] */
	center?: number[]
	/** Уровень масштабирования */
	zoom?: number
	/** API ключ для Яндекс Карт */
	apiKey?: string
	/** Высота карты */
	height?: string | number
	/** Ширина карты */
	width?: string | number
	/** Массив маркеров для отображения на карте */
	markers?: Marker[]
	/** Включить кластеризацию маркеров */
	clusterer?: boolean | ClustererOptions
	/** Массив контролов карты */
	controls?: string[]
	/** Массив поведений карты */
	behaviors?: string[]
	/** Дополнительные стили для контейнера карты */
	style?: React.CSSProperties
	/** Дополнительный класс для контейнера карты */
	className?: string
}
