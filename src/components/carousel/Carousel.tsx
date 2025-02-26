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

const Carousel = ({
	slides,
	navigationPosition = 'bottom',
	paginationPosition = 'inside',
	height = {
		mobile: '300px',
		desktop: '600px'
	},
	sideNavWidth = {
		mobile: '100%',
		desktop: '85%'
	},
	bottomNav = {
		marginBottom: {
			mobile: '60px',
			desktop: '60px'
		},
		arrowsOffset: {
			mobile: '45px',
			desktop: '60px'
		}
	},
	pagination = {
		offset: {
			mobile: '20px',
			desktop: '30px'
		}
	},
	arrows = {
		size: {
			mobile: '28px',
			desktop: '50px'
		},
		iconSize: {
			mobile: '12px',
			desktop: '14px'
		}
	}
}: CarouselProps) => {
	const carouselStyles = {
		'--mobile-height': height.mobile,
		'--desktop-height': height.desktop,
		'--mobile-width': sideNavWidth.mobile,
		'--desktop-width': sideNavWidth.desktop,
		'--bottom-margin-mobile': bottomNav.marginBottom?.mobile,
		'--bottom-margin-desktop': bottomNav.marginBottom?.desktop,
		'--arrows-offset-mobile': bottomNav.arrowsOffset?.mobile,
		'--arrows-offset-desktop': bottomNav.arrowsOffset?.desktop,
		'--arrows-size-mobile': arrows.size?.mobile,
		'--arrows-size-desktop': arrows.size?.desktop,
		'--arrows-icon-size-mobile': arrows.iconSize?.mobile,
		'--arrows-icon-size-desktop': arrows.iconSize?.desktop,
		'--pagination-offset-mobile': pagination.offset?.mobile,
		'--pagination-offset-desktop': pagination.offset?.desktop
	} as React.CSSProperties

	return (
		<FadeIn tag='section' className='ind cont'>
			<div
				className={cn(styles.carousel, {
					[styles.withSideNav]: navigationPosition === 'side',
					[styles.withBottomNav]: navigationPosition === 'bottom',
					[styles.paginationInside]: paginationPosition === 'inside',
					[styles.paginationOutside]: paginationPosition === 'outside'
				})}
				style={carouselStyles}
			>
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{ clickable: true }}
					navigation={true}
					effect={'fade'}
					modules={[EffectFade, Pagination, Navigation]}
					className={cn(
						'h-[var(--mobile-height)] md:h-[var(--desktop-height)]'
					)}
				>
					{slides.map(item => (
						<SwiperSlide key={item.id}>
							<div className='relative flex flex-col items-center justify-center rounded-box h-[var(--mobile-height)] md:h-[var(--desktop-height)]'>
								<Image
									className='absolute top-0 left-0 h-full w-full rounded-box -z-10 brightness-50'
									src={item.src}
									alt={item.alt}
									width={1000}
									height={1000}
									style={{ objectFit: 'cover' }}
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
