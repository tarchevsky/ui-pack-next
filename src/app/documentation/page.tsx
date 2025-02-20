import ContactForm from '@/components/contactForm/ContactForm'
import FadeIn from '@/components/fadeIn/FadeIn'
import PageHeading from '@/components/pageHeading/PageHeading'
import type { Metadata } from 'next'
import { documentationForm } from './documentationForm'

export const metadata: Metadata = {
	title: 'Документация',
	description: 'Страница документации и о том что и для чего'
}

export default function Documentation() {
	return (
		<>
			<PageHeading ind title='Документация' />
			<FadeIn className='cont ind'>
				<ContactForm fields={documentationForm} />
			</FadeIn>
		</>
	)
}
