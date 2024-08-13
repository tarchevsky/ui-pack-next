import Link from 'next/link'
import Image from 'next/image'
import { FigureProps } from '@/types'

const Figure = ({
	link,
	src,
	caption,
	width = 800,
	height = 1200,
	linkClass,
	figureClass,
	imageClass,
	figcaptionClass,
	unoptimized
}: FigureProps) => {
	return (
		<>
			{link ? (
				<Link
					href={link}
					target='_blank'
					rel='noopener noreferrer'
					className={linkClass}
				>
					<figure className={figureClass}>
						<Image
							src={src}
							alt={caption}
							width={width}
							height={height}
							className={`object-contain hover:brightness-90 transition-all ease-in-out ${imageClass}`}
							unoptimized={unoptimized}
						/>
						<figcaption className={`text-center ${figcaptionClass}`}>
							{caption}
						</figcaption>
					</figure>
				</Link>
			) : (
				<figure className={figureClass}>
					<Image
						src={src}
						alt={caption}
						width={width}
						height={height}
						className={`object-contain ${imageClass}`}
						unoptimized={unoptimized}
					/>
					<figcaption className={`text-center ${figcaptionClass}`}>
						{caption}
					</figcaption>
				</figure>
			)}
		</>
	)
}

export default Figure
