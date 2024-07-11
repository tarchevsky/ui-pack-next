import React, { useState, useEffect, useRef } from 'react'
import cn from 'clsx'
import styles from './InfiniteMasonry.module.scss'
import { MasonryProps } from '@/types'
import Image from 'next/image'

const InfiniteMasonry: React.FC<MasonryProps> = ({ images }) => {
	const [visibleImages, setVisibleImages] = useState<typeof images>([])
	const [page, setPage] = useState(1)
	const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>(
		{}
	)
	const loaderRef = useRef(null)

	const imagesPerPage = 6

	useEffect(() => {
		setVisibleImages(images.slice(0, imagesPerPage))
	}, [images])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const target = entries[0]
				if (target.isIntersecting) {
					loadMoreImages()
				}
			},
			{ rootMargin: '100px', threshold: 0 }
		)

		if (loaderRef.current) {
			observer.observe(loaderRef.current)
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current)
			}
		}
	}, [visibleImages])

	const loadMoreImages = () => {
		const nextPage = page + 1
		const startIndex = page * imagesPerPage
		const endIndex = nextPage * imagesPerPage
		const newImages = images.slice(startIndex, endIndex)

		if (newImages.length > 0) {
			setVisibleImages(prev => [...prev, ...newImages])
			setPage(nextPage)
		}
	}

	const shouldBeVertical = (columnIndex: number, imageIndex: number) => {
		if (columnIndex === 1) {
			return imageIndex % 2 === 0
		}
		return imageIndex % 2 !== 0
	}

	const handleImageLoad = (imageId: string) => {
		setImagesLoaded(prev => ({ ...prev, [imageId]: true }))
	}

	const columns = [
		visibleImages.filter((_, index) => index % 3 === 0),
		visibleImages.filter((_, index) => index % 3 === 1),
		visibleImages.filter((_, index) => index % 3 === 2)
	]

	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-6 md:grid-cols-3 mb-16'>
			{columns.map((column, columnIndex) => (
				<div key={columnIndex} className='flex flex-col gap-6'>
					{column.map((image, imageIndex) => (
						<div
							key={image.id}
							className={cn(styles.img, 'relative')}
							style={{
								height: shouldBeVertical(columnIndex, imageIndex)
									? '600px'
									: '300px'
							}}
						>
							{!imagesLoaded[image.id] && (
								<div className='skeleton h-full w-full rounded-box'></div>
							)}
							<Image
								className={cn('object-cover object-center rounded-box', {
									'opacity-0': !imagesLoaded[image.id]
								})}
								src={image.src}
								alt={image.alt}
								width={1000}
								height={1000}
								style={{ width: '100%', height: '100%' }}
								quality={10}
								onLoad={() => handleImageLoad(image.id)}
							/>
							{imagesLoaded[image.id] && (
								<div
									className={cn(
										styles.imgTitle,
										'absolute bottom-4 right-4 text-white'
									)}
								>
									{image.alt}
								</div>
							)}
						</div>
					))}
				</div>
			))}
			<div ref={loaderRef} style={{ height: '10px', width: '100%' }} />
		</div>
	)
}

export default InfiniteMasonry
