import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'
import Quiz from '@/components/quiz/Quiz'

export default function AboutPage() {
	return (
		<>
			<Meta title='О нас' metaDesc='Дескрипшен страницы' />
			<FadeIn className='cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>О нас</h1>
				</main>
				<Quiz />
			</FadeIn>
		</>
	)
}
