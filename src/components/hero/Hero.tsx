import { HeroProps } from '@/types'
import { useEffect, useState } from 'react'

const Hero = ({ title, buttonText, alt, subtitle }: HeroProps) => {
	const [imageUrl, setImageUrl] = useState('')

	const getRandomImage = async () => {
		const response = await fetch(
			`https://api.unsplash.com/photos/random?client_id=kQSsd8zaqbngiAsBH-G0sheRVSU9LjadcBNB6vEoz8Q`
		)
		const data = await response.json()
		setImageUrl(data.urls.regular)
	}

	useEffect(() => {
		getRandomImage()
	}, [])

	return (
		<main className='hero cont md:min-h-[80vh]'>
			<div className='relative hero-content flex-col lg:flex-row'>
				<img
					className='lg:w-1/2 h-[600px] min-w-[600px] object-cover rounded-3xl shadow-2xl'
					src={imageUrl}
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
