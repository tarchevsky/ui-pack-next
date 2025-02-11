import FadeIn from '@/components/fadeIn/FadeIn'
import Quiz from '@/components/quiz/Quiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'О нас',
	description: 'Страница О нас'
}

export default function AboutPage() {
	return (
		<FadeIn className='cont'>
			<main>
				<h1 className={`text-4xl font-bold`}>О нас</h1>
			</main>
			<Quiz />
		</FadeIn>
	)
}
