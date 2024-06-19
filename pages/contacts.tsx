import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'
import ContactForm from '@/components/contactForm/ContactForm'

const ContactsPage: NextPage = () => {
	return (
		<>
			<Meta title='Контакты' metaDesc='Описание страницы контактов' />
			<FadeIn className='cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>Контакты</h1>
				</main>
			</FadeIn>
			<FadeIn className='cont mb-40'>
				<ContactForm />
			</FadeIn>
		</>
	)
}

export default ContactsPage
