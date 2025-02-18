import PageHeading from '@/components/pageHeading/PageHeading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Документация',
	description: 'Страница документации и о том что и для чего'
}

export default function Documentation() {
	return <PageHeading ind title='Документация' />
}
