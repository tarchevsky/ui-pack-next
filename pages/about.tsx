import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'

const AboutPage: NextPage = () => {
	return (
		<FadeIn>
			<h1 className={`text-4xl font-bold`}>О нас</h1>
		</FadeIn>
	)
}

export default AboutPage
