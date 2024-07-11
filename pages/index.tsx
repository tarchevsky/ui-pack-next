import { NextPage } from 'next'
import Hero from '@/components/hero/Hero'
import Accordion from '@/components/accordion/Accordion'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'
import CarouselBeyond from '@/components/carouselBeyond/CarouselBeyond'
import Carousel from '@/components/carousel/Carousel'
import { MaterialSlider } from '@/components/materialSlider/MaterialSlider'
import { images } from '@/components/infiniteMasonry/images'
import InfiniteMasonry from '@/components/infiniteMasonry/InfiniteMasonry'

const HomePage: NextPage = () => {
	return (
		<>
			<Meta title='Главная' metaDesc='Описание страницы' />
			<FadeIn className='cont'>
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
			</FadeIn>
			<FadeIn className='cont flex gap-20 mb-14'>
				<h1 className='text-3xl font-extrabold'>Какой-то заголовок</h1>
				<p>Какой-то текст</p>
			</FadeIn>
			<CarouselBeyond />
			<Carousel />
			<FadeIn>
				<MaterialSlider />
			</FadeIn>
			<div className='cont'>
				<InfiniteMasonry images={images} />
			</div>
		</>
	)
}

export default HomePage
