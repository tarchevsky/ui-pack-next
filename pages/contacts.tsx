import { NextPage } from 'next'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'

const ContactsPage: NextPage = () => {
	return (
		<>
			<Meta title='Контакты' metaDesc='Описание страницы контактов' />
			<FadeIn className='cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>Контакты</h1>
				</main>
			</FadeIn>
		</>
	)
}

export default ContactsPage
