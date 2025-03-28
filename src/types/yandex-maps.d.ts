declare namespace ymaps {
	export type Map = any
	export type Placemark = any
	export type Clusterer = any
	export type IGeoObject = any

	export interface IMapOptions {
		center: number[]
		zoom: number
		controls: string[]
		behaviors: string[]
	}
}

interface Window {
	ymaps: {
		Map: new (element: HTMLElement, options: ymaps.IMapOptions) => ymaps.Map
		Placemark: new (
			coordinates: number[],
			properties: any,
			options: any
		) => ymaps.Placemark
		Clusterer: new (options: any) => ymaps.Clusterer
		ready: (callback: () => void) => void
	}
}
