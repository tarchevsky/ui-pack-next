import ContactForm from '@/components/contactForm/ContactForm'
import FadeIn from '@/components/fadeIn/FadeIn'
import PageHeading from '@/components/pageHeading/PageHeading'

import Contact from '@/components/contact/Contact'
import type { FormField } from '@/components/contactForm/contactForm.types'
import Htag from '@/components/Htag/Htag'
import type { Metadata } from 'next'
import Link from 'next/link'
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
			<PageHeading
				className='cont'
				ind
				title='Контакты'
				breadcrumbs={[{ label: 'Главная', href: '/' }, { label: 'Контакты' }]}
			/>
			<FadeIn className='ind cont flex md:grid md:grid-cols-2 gap-4 md:gap-16'>
				<div className='flex flex-col gap-4'>
					<div className={'flex flex-col gap-4'}>
						<Link href={'tel:+79000000000'}>+79000000000</Link>
					</div>
				</div>
				<div>
					<Htag tag='h2'>
						если у вас остались вопросы или вы хотите оставить какие-то
						пожелания или добрые слова, пишите
					</Htag>
					<Contact type='email' data='mail@mail.ru' className='text-5xl' />
					<ContactForm fields={fields} message='Ваше сообщение' closeIcon />
				</div>
				<ContactForm fields={fields} message='Ваше сообщение' closeIcon />
			</FadeIn>
		</>
	)
}
