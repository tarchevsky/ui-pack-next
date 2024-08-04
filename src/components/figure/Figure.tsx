import Link from 'next/link'
import Image from 'next/image'
import { FigureProps } from '@/types'

const Figure = ({ link, src, caption }: FigureProps) => {
	return (
		<>
			{link ? (
				<Link href={link} target='_blank' rel='noopener noreferrer'>
					<figure>
						<Image
							src={src}
							alt={caption}
							width={800}
							height={1200}
							className='object-contain hover:brightness-90 transition-all ease-in-out'
						/>
						<figcaption className='text-center'>{caption}</figcaption>
					</figure>
				</Link>
			) : (
				<figure>
					<Image
						src={src}
						alt={caption}
						width={800}
						height={1200}
						className='object-contain hover:brightness-90 transition-all ease-in-out'
					/>
					<figcaption className='text-center'>{caption}</figcaption>
				</figure>
			)}
		</>
	)
}

export default Figure
