import ContactForm from '@/components/contactForm/ContactForm'
import FadeIn from '@/components/fadeIn/FadeIn'
import PageHeading from '@/components/pageHeading/PageHeading'

import type { FormField } from '@/components/contactForm/contactForm.types'
import type { Metadata } from 'next'
import { contactFormFields } from './contactFormFields'

export const metadata: Metadata = {
	title: 'Контакты',
	description: 'Страница контактов'
}

async function getFormFields(): Promise<FormField[]> {
	// В реальном приложении здесь будет запрос к API или другой источник данных
	return contactFormFields
}

export default async function ContactsPage() {
	const fields = await getFormFields()

	return (
		<>
			<PageHeading ind title='Контакты' />
			<FadeIn className='ind cont flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-16'>
				<ContactForm fields={fields} message='Ваше сообщение' closeIcon />
				<div className='flex flex-col gap-4'>
					<h2 className={'text-3xl font-bold'}>
						Оставьте заявку, либо свяжитесь с нами
					</h2>
					<div className={'flex flex-col gap-4'}>
						<a href={'mailto:mail@mail.ru'}>mail@mail.ru</a>
						<a href={'tel:+79000000000'}>+79000000000</a>
					</div>
				</div>
			</FadeIn>
		</>
	)
}
