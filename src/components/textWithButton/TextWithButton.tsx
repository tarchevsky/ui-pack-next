import FadeIn from '../fadeIn/FadeIn'

const TextWithButton = () => {
	return (
		<FadeIn className='ind cont'>
			<div className='mt-16 flex items-center justify-between'>
				<p className='text-2xl'>Остались вопросы?</p>
				<button className='btn btn-lg'>Задать вопрос</button>
			</div>
		</FadeIn>
	)
}

export default TextWithButton
