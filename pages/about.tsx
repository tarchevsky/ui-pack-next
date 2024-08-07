import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'
import Quiz from '@/components/quiz/Quiz'

const AboutPage: NextPage = () => {
	return (
		<>
			<Meta title='О нас' metaDesc='Дескрипшен страницы' />
			<FadeIn className='cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>О нас</h1>
				</main>
				<div className='rounded p-16'>
					<Quiz />
				</div>
			</FadeIn>
		</>
	)
}

export default AboutPage
