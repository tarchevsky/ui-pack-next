'use client'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import FadeIn from '@/components/fadeIn/FadeIn'
import cn from 'clsx'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Carousel.module.scss'

import type { CarouselProps } from '@/types'
import Image from 'next/image'

const Carousel = ({ slides, navigationPosition = 'bottom' }: CarouselProps) => {
	return (
		<FadeIn tag='section' className='ind cont'>
			<div
				className={cn(styles.carousel, {
					[styles.withSideNav]: navigationPosition === 'side',
					[styles.withBottomNav]: navigationPosition === 'bottom'
				})}
			>
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{
						clickable: true
					}}
					navigation={true}
					effect={'fade'}
					modules={[EffectFade, Pagination, Navigation]}
					className='h-[300px] md:h-full'
				>
					{slides.map(item => (
						<SwiperSlide key={item.id}>
							<div className='relative flex flex-col items-center justify-center rounded-box h-[300px] md:h-full'>
								<Image
									className='absolute top-0 left-0 h-full w-full rounded-box -z-10 brightness-50'
									src={item.src}
									alt={item.alt}
									width={1000}
									height={1000}
									style={{
										objectFit: 'cover'
									}}
									quality={10}
								/>
								<div className='font-thin text-5xl text-white'>
									{item.title}
								</div>
								<div className='text-white'>{item.description}</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</FadeIn>
	)
}

export default Carousel
