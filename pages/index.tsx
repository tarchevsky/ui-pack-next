import { NextPage } from 'next'
import Hero from '@/components/hero/Hero'
import Accordion from '@/components/accordion/Accordion'
import FadeIn from '@/components/fadeIn/FadeIn'
import Meta from '@/components/meta/Meta'
import CarouselBeyond from '@/components/carouselBeyond/CarouselBeyond'

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
				<h1>Заголовок</h1>
				<h2>Заголовок</h2>
				<h3>Заголовок</h3>
				<h4>Заголовок</h4>
				<h5>Заголовок</h5>
				<h6>Заголовок</h6>
			</FadeIn>
			<FadeIn className='cont'>
				<CarouselBeyond />
			</FadeIn>
		</>
	)
}

export default HomePage
