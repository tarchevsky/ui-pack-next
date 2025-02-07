import FadeIn from '@/components/fadeIn/FadeIn'
import { StepNavigationProps } from '@/components/quiz/quiz.types'
import { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const StepNavigation: FC<StepNavigationProps> = ({
	currentStep,
	totalSteps,
	prevStep,
	nextStep,
	onSubmit,
	isSubmitting
}) => (
	<>
		{currentStep === totalSteps ? (
			<FadeIn delay={0.5}>
				<button
					type='submit'
					onClick={onSubmit}
					className='btn btn-primary'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Отправка...' : 'Отправить'}
				</button>
			</FadeIn>
		) : null}
		<div className='flex justify-end'>
			<button
				type='button'
				onClick={prevStep}
				className={`btn ${currentStep === 1 ? 'btn-disabled' : 'btn-secondary'}`}
				disabled={currentStep === 1}
			>
				<IoIosArrowBack />
			</button>
			{currentStep === totalSteps ? (
				<button
					type='button'
					onClick={nextStep}
					className='btn btn-primary btn-disabled'
					aria-disabled='true'
				>
					<IoIosArrowForward />
				</button>
			) : (
				<button type='button' onClick={nextStep} className='btn btn-primary'>
					<IoIosArrowForward />
				</button>
			)}
		</div>
	</>
)

export default StepNavigation
