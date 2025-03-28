'use client'

import { memo, useCallback, useEffect, useRef } from 'react'
import type { YandexMapProps } from './types'

const YandexMap = memo(
	({
		center = [55.757359, 37.602669],
		zoom = 17,
		apiKey = process.env.NEXT_PUBLIC_YA_MAP_API_KEY,
		height,
		width,
		markers,
		clusterer = false,
		controls = ['zoomControl'],
		behaviors = ['drag', 'scrollZoom', 'dblClickZoom'],
		style = {},
		className
	}: YandexMapProps) => {
		const mapRef = useRef<HTMLDivElement>(null)
		const mapInstance = useRef<any | null>(null)

		const createMap = useCallback((): any => {
			if (!mapRef.current || typeof window === 'undefined' || !window.ymaps)
				return null

			mapInstance.current?.destroy()

			const map = new window.ymaps.Map(mapRef.current, {
				center,
				zoom,
				controls: controls as string[],
				behaviors: behaviors as string[]
			})

			return map
		}, [center, zoom, controls, behaviors])

		const addMarkers = useCallback(
			(map: any) => {
				const markersToAdd = markers || [{ coordinates: center }]
				if (!markersToAdd.length) return

				const placemarks = markersToAdd.map(marker => {
					const placemark = new window.ymaps.Placemark(
						marker.coordinates,
						{
							balloonContentHeader: marker.title,
							balloonContentBody: marker.description
						},
						{
							preset: marker.color
								? `islands#${marker.color}DotIcon`
								: 'islands#blueDotIcon',
							// Настройки балуна
							balloonContentLayout: marker.balloonStyle?.balloonContentLayout,
							balloonPanelMaxMapArea:
								marker.balloonStyle?.balloonPanelMaxMapArea,
							balloonAutoPan: marker.balloonStyle?.balloonAutoPan ?? true,
							openBalloonOnClick:
								marker.balloonStyle?.openBalloonOnClick ?? true,
							hideIconOnBalloonOpen: marker.balloonStyle?.hideIconOnBalloonOpen,
							balloonOffset: marker.balloonStyle?.balloonOffset,
							// Настройки иконки
							iconLayout: marker.iconStyle?.iconLayout,
							iconImageHref: marker.iconStyle?.iconImageHref,
							iconImageSize: marker.iconStyle?.iconImageSize,
							iconImageOffset: marker.iconStyle?.iconImageOffset
						}
					)

					return { placemark, openByDefault: marker.openByDefault }
				})

				if (clusterer && placemarks.length > 1) {
					const clustererInstance = new window.ymaps.Clusterer(
						typeof clusterer === 'object'
							? clusterer
							: {
									preset: 'islands#blueClusterIcons',
									clusterDisableClickZoom: true
								}
					)

					clustererInstance.add(placemarks.map(p => p.placemark))
					map.geoObjects.add(clustererInstance)
				} else {
					placemarks.forEach(({ placemark, openByDefault }) => {
						map.geoObjects.add(placemark)
						// Открываем балун после добавления метки на карту
						if (openByDefault) {
							setTimeout(() => {
								placemark.balloon.open()
							}, 0)
						}
					})
				}
			},
			[markers, center, clusterer]
		)

		useEffect(() => {
			const script = document.createElement('script')
			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
			script.async = true

			const handleLoad = () => {
				window.ymaps.ready(() => {
					const map = createMap()
					if (map) {
						mapInstance.current = map
						addMarkers(map)
					}
				})
			}

			script.addEventListener('load', handleLoad)
			document.head.appendChild(script)

			return () => {
				script.removeEventListener('load', handleLoad)
				mapInstance.current?.destroy()
			}
		}, [apiKey, createMap, addMarkers])

		return (
			<div
				ref={mapRef}
				className={className}
				style={{
					width: className ? undefined : width || '100%',
					height: className ? undefined : height || '500px',
					...style
				}}
			/>
		)
	}
)

YandexMap.displayName = 'YandexMap'

export default YandexMap
