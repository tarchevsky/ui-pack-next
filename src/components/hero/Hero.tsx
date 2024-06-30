import { HeroProps } from '@/types'
import Image from 'next/image'

const Hero = ({ title, buttonText, alt, subtitle, src }: HeroProps) => {
	return (
		<main className='hero cont md:min-h-[80vh]'>
			<div className='relative hero-content flex-col-reverse items-start lg:items-center lg:flex-row'>
				<Image
					className='lg:w-1/2 h-[300px] md:h-[600px] md:min-w-[600px] object-cover rounded-box shadow-2xl'
					src={src}
					alt={alt}
					width={400}
					height={300}
					priority
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
		</main>
	)
}

export default Hero
