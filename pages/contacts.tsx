import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'
import ContactForm from '@/components/contactForm/ContactForm'

const title = 'Контакты'

const ContactsPage: NextPage = () => {
	return (
		<>
			<Meta title={title} metaDesc='Описание страницы контактов' />
			<FadeIn className='cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>{title}</h1>
				</main>
			</FadeIn>
			<FadeIn className='cont mb-40'>
				<ContactForm title={title} />
			</FadeIn>
		</>
	)
}

export default ContactsPage
