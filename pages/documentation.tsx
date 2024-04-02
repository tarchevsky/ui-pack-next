import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'

const Documentation: NextPage = () => {
	return (
		<FadeIn>
			<main>
				<h1 className={`text-4xl font-bold`}>Документация</h1>
			</main>
		</FadeIn>
	)
}

export default Documentation
