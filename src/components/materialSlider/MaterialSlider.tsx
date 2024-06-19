import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules'
import EffectMaterial from './effect-material.esm.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import FadeIn from '@/components/fadeIn/FadeIn'
import styles from './MaterialSlider.module.scss'
import cn from 'clsx'

export const MaterialSlider = () => {
	return (
		<FadeIn className='cont mb-60'>
			<Swiper
				modules={[Autoplay, Navigation, Pagination, EffectMaterial, Mousewheel]}
				effect={'material'}
				spaceBetween='16'
				grabCursor={true}
				slidesPerView={2}
				loop={true}
				mousewheel={true}
			>
				<SwiperSlide>
					<div className={cn(styles.wrapper, 'swiper-material-wrapper')}>
						<div className={cn(styles.content, 'swiper-material-content')}>
							<img
								className={cn(styles.image, 'material-image')}
								data-swiper-material-scale='1.25'
								src='/fog-sea.jpg'
							/>

							<span
								className={cn(
									styles.label,
									'material-label swiper-material-animate-opacity'
								)}
							>
								Slide 1
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={cn(styles.wrapper, 'swiper-material-wrapper')}>
						<div className={cn(styles.content, 'swiper-material-content')}>
							<img
								className={cn(styles.image, 'material-image')}
								data-swiper-material-scale='1.25'
								src='/forest-river.jpg'
							/>

							<span
								className={cn(
									styles.label,
									'material-label swiper-material-animate-opacity'
								)}
							>
								Slide 2
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={cn(styles.wrapper, 'swiper-material-wrapper')}>
						<div className={cn(styles.content, 'swiper-material-content')}>
							<img
								className={cn(styles.image, 'material-image')}
								data-swiper-material-scale='1.25'
								src='/more-dark.jpg'
							/>

							<span
								className={cn(
									styles.label,
									'material-label swiper-material-animate-opacity'
								)}
							>
								Slide 3
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={cn(styles.wrapper, 'swiper-material-wrapper')}>
						<div className={cn(styles.content, 'swiper-material-content')}>
							<img
								className={cn(styles.image, 'material-image')}
								data-swiper-material-scale='1.25'
								src='/note.jpg'
							/>

							<span
								className={cn(
									styles.label,
									'material-label swiper-material-animate-opacity'
								)}
							>
								Slide 4
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={cn(styles.wrapper, 'swiper-material-wrapper')}>
						<div className={cn(styles.content, 'swiper-material-content')}>
							<img
								className={cn(styles.image, 'material-image')}
								data-swiper-material-scale='1.25'
								src='/05.jpg'
							/>

							<span
								className={cn(
									styles.label,
									'material-label swiper-material-animate-opacity'
								)}
							>
								Slide 5
							</span>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className={cn(styles.wrapper, 'swiper-material-wrapper')}>
						<div className={cn(styles.content, 'swiper-material-content')}>
							<img
								className={cn(styles.image, 'material-image')}
								data-swiper-material-scale='1.25'
								src='/06.jpg'
							/>

							<span
								className={cn(
									styles.label,
									'material-label swiper-material-animate-opacity'
								)}
							>
								Slide 6
							</span>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</FadeIn>
	)
}
