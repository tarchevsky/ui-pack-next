'use client'

import YandexMap from './YandexMap'
import type { YandexMapProps } from './types'

export default function ClientYandexMap(props: YandexMapProps) {
	return <YandexMap {...props} />
}
