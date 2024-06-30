import cn from 'clsx'
import styles from './Masonry.module.scss'

const Masonry = () => {
	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-6 md:grid-cols-3 mb-16'>
			<div className='grid gap-6'>
				<div className={cn(styles.img, 'relative')}>
					<img
						className='h-full max-w-full rounded-box object-cover object-center'
						src='https://images.unsplash.com/photo-1619417606952-552a15237367?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Алтай'
					/>
					<div className={cn(styles.imgTitle, 'absolute bottom-4 right-4')}>
						Алтай
					</div>
				</div>
				<div>
					<img
						className='h-full max-w-full rounded-box object-cover object-center '
						src='https://images.unsplash.com/photo-1606841002936-38996d5eea7f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Териберка'
					/>
				</div>
			</div>
			<div className='grid gap-6'>
				<div>
					<img
						className='h-full max-w-full rounded-box object-cover object-center'
						src='https://images.unsplash.com/photo-1630535879508-9a3a8967d9be?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Санкт-Петербург'
					/>
				</div>
				<div>
					<img
						className='h-full max-w-full rounded-box object-cover object-center'
						src='https://images.unsplash.com/photo-1665073140507-0bad3d962476?q=80&w=3303&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Камчатка'
					/>
				</div>
			</div>
			<div className='grid gap-6'>
				<div>
					<img
						className='h-full max-w-full rounded-box object-cover object-center'
						src='https://images.unsplash.com/photo-1623335177873-2caed992d1c7?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Переславль-Залесский'
					/>
				</div>
			</div>
		</div>
	)
}

export default Masonry
