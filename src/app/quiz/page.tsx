import PageHeading from '@/components/pageHeading/PageHeading'
import Quiz from '@/components/quiz/Quiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Демо квиза',
	description:
		'Квиз - это компонент викторины или опросника, - кому как удобно называть. Суть его в том, что вы можете выбрать список вопросов и тип ответа и верстка сразу подстроится под Ваши нужны'
}

export default function QuizPage() {
	return (
		<>
			<PageHeading className='cont' title='Демо квиза' />
			<Quiz
				steps
				message='Спасибо, что прошли наш опросник! Мы обязательно свяжемся с вами!'
				closeIcon
			/>
		</>
	)
}
