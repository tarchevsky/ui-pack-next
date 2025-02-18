import type { FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import type { StepNavigationProps } from './quiz.types'

const StepNavigation: FC<StepNavigationProps> = ({
	currentStep,
	totalSteps,
	prevStep,
	nextStep,
	onSubmit,
	isSubmitting
}) => (
	<div
		className={`${currentStep === totalSteps ? 'grid grid-cols-[auto_48px_48px] md:flex md:justify-end md:items-center' : 'flex justify-end items-center'} gap-2 z-10`}
	>
		{currentStep === totalSteps ? (
			<button
				type='submit'
				onClick={onSubmit}
				className='btn btn-primary'
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Отправка...' : 'Отправить'}
			</button>
		) : null}

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
)

export default StepNavigation
