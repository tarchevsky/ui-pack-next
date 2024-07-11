import FadeIn from '@/components/fadeIn/FadeIn'
import { AccordionProps } from '@/types'

const Accordion = ({
	tab1,
	content1,
	tab2,
	content2,
	tab3,
	content3
}: AccordionProps) => {
	return (
		<FadeIn className='mb-60'>
			<div className='collapse collapse-arrow bg-base-200 mb-4'>
				<input
					type='radio'
					name='my-accordion-2'
					defaultChecked
					aria-label='Accordion tab 1'
				/>
				<div className='collapse-title text-xl font-medium'>{tab1}</div>
				<div className='collapse-content'>
					<p>{content1}</p>
				</div>
			</div>
			<div className='collapse collapse-arrow bg-base-200 mb-4'>
				<input
					type='radio'
					name='my-accordion-2'
					aria-label='Accordion tab 2'
				/>
				<div className='collapse-title text-xl font-medium'>{tab2}</div>
				<div className='collapse-content'>
					<p>{content2}</p>
				</div>
			</div>
			<div className='collapse collapse-arrow bg-base-200 mb-4'>
				<input
					type='radio'
					name='my-accordion-2'
					aria-label='Accordion tab 3'
				/>
				<div className='collapse-title text-xl font-medium'>{tab3}</div>
				<div className='collapse-content'>
					<p>{content3}</p>
				</div>
			</div>
		</FadeIn>
	)
}

export default Accordion
