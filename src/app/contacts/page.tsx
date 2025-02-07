import ContactForm from '@/components/contactForm/ContactForm'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'

const title = 'Контакты'

export default function ContactsPage() {
	return (
		<>
			<Meta title={title} metaDesc='Описание страницы контактов' />
			<FadeIn className='cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>{title}</h1>
				</main>
			</FadeIn>
			<FadeIn className='cont mb-40 grid grid-cols-2 gap-16'>
				<ContactForm title={title} />
				<div className='flex flex-col gap-6 mt-10'>
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
