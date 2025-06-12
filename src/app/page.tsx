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
import dynamic from 'next/dynamic'
import { carousel } from './carousel'
import { contactFormFields } from './contactFormFields'

// Динамический импорт клиентского компонента без SSR
const YandexMap = dynamic(() => import('@/components/yandexMap/YandexMap'), {
	ssr: false
})

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
				config='cover'
				modalContent={
					<ModalContactForm
						fields={contactFormFields}
						message='Спасибо за заявку и проявленный интерес! Мы скоро свяжемся с вами.'
					/>
				}
			/>
			<Stage />
			<TextWithButton
				modalContent={
					<ModalContactForm
						fields={contactFormFields}
						message='Спасибо за заявку и проявленный интерес! Мы скоро свяжемся с вами.'
					/>
				}
			/>
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
						mobile: '50px',
						desktop: '70px'
					},
					arrowsOffset: {
						mobile: '40px',
						desktop: '75px'
					}
				}}
				sideNavWidth={{
					mobile: '95%', // Уменьшаем ширину на мобильных для дополнительного отступа
					desktop: '85%'
				}}
				pagination={{
					offset: {
						mobile: '38px',
						desktop: '60px'
					}
				}}
				arrows={{
					size: {
						mobile: '28px',
						desktop: '50px'
					},
					iconSize: {
						mobile: '12px',
						desktop: '14px'
					}
				}}
			/>
			<MaterialSlider />
			<InfiniteMasonry images={images} />
			<YandexMap />
		</>
	)
}
