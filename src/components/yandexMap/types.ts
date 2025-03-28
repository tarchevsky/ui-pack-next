declare namespace ymaps {
	interface IMapState {
		controls: string[]
		zoom: number
		center: number[]
		behaviors: string[]
	}

	interface IMapOptions {
		center: number[]
		zoom: number
		controls?: string[]
		behaviors?: string[]
	}

	interface IGeometry {
		getCoordinates(): number[]
		setCoordinates(coordinates: number[]): void
	}

	interface IDataManager {
		get(path: string, defaultValue?: any): any
		set(path: string, value: any): void
	}

	interface IBalloon {
		open(): void
		close(): void
	}

	interface IEvent {
		get(key: string): any
	}

	interface IEventManager {
		add(types: string[], callback: (e: IEvent) => void): this
		remove(types: string[]): this
	}

	interface IGeoObject {
		geometry: IGeometry
		properties: IDataManager
		events: IEventManager
		balloon: IBalloon
	}

	interface IGeoObjectCollection {
		add(object: IGeoObject): this
		remove(object: IGeoObject): this
	}

	class Map {
		constructor(element: HTMLElement, options: IMapOptions)
		destroy(): void
		geoObjects: IGeoObjectCollection
		events: IEventManager
		balloon: IBalloon
		action: IEventManager
		behaviors: IEventManager
		container: HTMLElement
		controls: IEventManager
		converter: any
		copyrights: any
		cursors: any
		hint: any
		layers: any
		margin: any
		options: any
		panes: any
		zoomRange: any
		state: IMapState
		properties: IDataManager
		getBounds(): number[][]
		getCenter(): number[]
		getGlobalPixelCenter(): number[]
		getPanoramaManager(): Promise<any>
		getType(): string
		getZoom(): number
		panTo(center: number[], options?: any): Promise<void>
		setBounds(bounds: number[][]): Promise<void>
		setCenter(center: number[]): Promise<void>
		setGlobalPixelCenter(globalPixelCenter: number[]): Promise<void>
		setType(type: string): Promise<void>
		setZoom(zoom: number): Promise<void>
	}

	class Placemark implements IGeoObject {
		constructor(coordinates: number[], properties?: any, options?: any)
		geometry: IGeometry
		properties: IDataManager
		events: IEventManager
		balloon: IBalloon
	}

	class Clusterer implements IGeoObject {
		constructor(options?: any)
		add(placemarks: Placemark[]): void
		geometry: IGeometry
		properties: IDataManager
		events: IEventManager
		balloon: IBalloon
	}

	function ready(callback: () => void): void
}

declare global {
	interface Window {
		ymaps: {
			Map: {
				new (element: HTMLElement, options: ymaps.IMapOptions): ymaps.Map
			}
			Placemark: {
				new (
					coordinates: number[],
					properties?: any,
					options?: any
				): ymaps.Placemark
			}
			Clusterer: {
				new (options?: any): ymaps.Clusterer
			}
			ready(callback: () => void): void
		}
	}
}

export interface BalloonStyle {
	balloonContentLayout?: string
	balloonPanelMaxMapArea?: number
	balloonAutoPan?: boolean
	openBalloonOnClick?: boolean
	hideIconOnBalloonOpen?: boolean
	balloonOffset?: number[]
}

export interface IconStyle {
	iconLayout?: string
	iconImageHref?: string
	iconImageSize?: number[]
	iconImageOffset?: number[]
}

export interface Marker {
	coordinates: number[]
	title?: string
	description?: string
	color?: string
	openByDefault?: boolean
	balloonStyle?: BalloonStyle
	iconStyle?: IconStyle
}

export interface ClustererOptions {
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
