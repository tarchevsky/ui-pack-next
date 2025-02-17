import type { HeroProps } from '@/types'
import Image from 'next/image'
import FadeIn from '../fadeIn/FadeIn'

const Hero = ({
	title,
	buttonText,
	alt,
	subtitle,
	src,
	unoptimized
}: HeroProps) => {
	return (
		<FadeIn tag='main' className='hero cont md:min-h-[80vh] ind'>
			<div className='relative hero-content flex-col-reverse items-start lg:items-center lg:flex-row'>
				<Image
					className='lg:w-1/2 h-[300px] md:h-[600px] md:min-w-[600px] object-cover rounded-box shadow-2xl'
					src={src}
					alt={alt}
					width={400}
					height={300}
					priority
					unoptimized={unoptimized}
				/>
				<div className='md:relative lg:ml-[-100px] z-10'>
					<h1 className='text-5xl font-extrabold'>{title}</h1>
					{subtitle ? <p>{subtitle}</p> : null}
					{buttonText ? (
						<button className='btn btn-primary btn-lg mt-3'>
							{buttonText}
						</button>
					) : null}
				</div>
			</div>
		</FadeIn>
	)
}

export default Hero
