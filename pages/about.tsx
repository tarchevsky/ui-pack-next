import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'

const AboutPage: NextPage = () => {
	return (
		<FadeIn>
			<main>
				<h1 className={`text-4xl font-bold`}>О нас</h1>
			</main>
		</FadeIn>
	)
}

export default AboutPage
