import FadeIn from '@/components/fadeIn/FadeIn'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Документация',
	description: 'Страница документации и о том что и для чего'
}

export default function Documentation() {
	return (
		<FadeIn className='cont'>
			<main>
				<h1 className={`text-4xl font-bold`}>Документация</h1>
			</main>
		</FadeIn>
	)
}
