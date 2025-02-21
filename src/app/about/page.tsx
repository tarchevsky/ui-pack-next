import PageHeading from '@/components/pageHeading/PageHeading'
import Quiz from '@/components/quiz/Quiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'О нас',
	description: 'Страница О нас'
}

export default function AboutPage() {
	return (
		<>
			<PageHeading title='О нас' />
			<Quiz
				steps
				message='Спасибо, что прошли наш опросник! Мы обязательно свяжемся с вами!'
				closeIcon
			/>
		</>
	)
}
