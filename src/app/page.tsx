import { carousel } from '@/app/carousel'
import Accordion from '@/components/accordion/Accordion'
import Carousel from '@/components/carousel/Carousel'
import CarouselBeyond from '@/components/carouselBeyond/CarouselBeyond'
import ModalContactForm from '@/components/contactForm/ModalContactForm'
import Hero from '@/components/hero/Hero'
import { images } from '@/components/infiniteMasonry/images'
import InfiniteMasonry from '@/components/infiniteMasonry/InfiniteMasonry'
import { MaterialSlider } from '@/components/materialSlider/MaterialSlider'
import Stage from '@/components/stage/Stage'
import TextWithButton from '@/components/textWithButton/TextWithButton'
import type { Metadata } from 'next'
import { contactFormFields } from './contactFormFields'

export const metadata: Metadata = {
	title: 'Главная',
	description: 'Дескрипшен главной страницы'
}

export default function HomePage() {
	return (
		<>
			<Hero
				src='/fog-sea.jpg'
				alt='Альт картинки'
				title='Заголовок'
				buttonText='Обратная связь'
				closeIcon
				modalContent={
					<ModalContactForm
						fields={contactFormFields}
						message='Моё сообщение'
					/>
				}
			/>
			<Stage />
			<TextWithButton />
			<Accordion
				tab1='Какой-то заголовок'
				content1='Какой-то текст'
				tab2='Какой-то заголовок'
				content2='Какой-то текст'
				tab3='Какой-то заголовок'
				content3='Какой-то текст'
			/>
			<CarouselBeyond />
			<Carousel
				slides={carousel}
				navigationPosition='side'
				paginationPosition='outside'
				height={{
					mobile: '300px',
					desktop: '600px'
				}}
				bottomNav={{
					marginBottom: {
						mobile: '45px',
						desktop: '60px'
					},
					arrowsOffset: {
						mobile: '35px',
						desktop: '60px'
					}
				}}
				sideNavWidth={{
					mobile: '95%', // Уменьшаем ширину на мобильных для дополнительного отступа
					desktop: '85%'
				}}
				pagination={{
					offset: {
						mobile: '30px',
						desktop: '30px'
					}
				}}
			/>
			<MaterialSlider />
			<InfiniteMasonry images={images} />
		</>
	)
}
