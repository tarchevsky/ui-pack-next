import { HeroProps } from '@/types'

const Hero = ({ title, buttonText, alt, subtitle, src }: HeroProps) => {
	return (
		<main className='hero cont md:min-h-[80vh]'>
			<div className='relative hero-content flex-col lg:flex-row'>
				<img
					className='lg:w-1/2 h-[600px] min-w-[600px] object-cover rounded-3xl shadow-2xl'
					src={src}
					alt={alt}
					loading='lazy'
				/>
				<div className='absolute lg:relative lg:ml-[-100px] z-10'>
					<h1
						className='md:text-6xl font-bold base-content'
						dangerouslySetInnerHTML={{
							__html: title
						}}
					/>
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
