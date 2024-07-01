import cn from 'clsx'
import styles from './Masonry.module.scss'
import { MasonryProps } from '@/types'
import Image from 'next/image'

const Masonry: React.FC<MasonryProps> = ({ images }) => {
	// Разделяем изображения на три колонки
	const columns = [
		images.filter((_, index) => index % 3 === 0),
		images.filter((_, index) => index % 3 === 1),
		images.filter((_, index) => index % 3 === 2)
	]

	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-6 md:grid-cols-3 mb-16'>
			{columns.map((column, columnIndex) => (
				<div key={columnIndex} className='grid gap-6'>
					{column.map(image => (
						<div key={image.id} className={cn(styles.img, 'relative')}>
							<Image
								className='object-cover object-center rounded-box'
								src={image.src}
								alt={image.alt}
								width={1000}
								height={1000}
								style={{ width: '100%', height: '100%' }}
								quality={10}
							/>

							<div
								className={cn(
									styles.imgTitle,
									'absolute bottom-4 right-4 text-white'
								)}
							>
								{image.alt}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default Masonry
