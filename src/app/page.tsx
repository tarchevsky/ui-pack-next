import Accordion from '@/components/accordion/Accordion'
import Carousel from '@/components/carousel/Carousel'
import CarouselBeyond from '@/components/carouselBeyond/CarouselBeyond'
import Hero from '@/components/hero/Hero'
import { images } from '@/components/infiniteMasonry/images'
import InfiniteMasonry from '@/components/infiniteMasonry/InfiniteMasonry'
import { MaterialSlider } from '@/components/materialSlider/MaterialSlider'
import type { Metadata } from 'next'

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
			<Carousel />
			<MaterialSlider />
			<InfiniteMasonry images={images} />
		</>
	)
}
