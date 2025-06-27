import Link from 'next/link'

export interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
	className?: string
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
	if (!items || items.length === 0) return null

	return (
		<nav aria-label='Хлебные крошки' className={className}>
			<ol className='flex items-center gap-1 text-sm text-gray-500'>
				{items.map((item, idx) => (
					<li key={idx} className='flex items-center'>
						{item.href && idx !== items.length - 1 ? (
							<Link href={item.href} className='link hover:underline'>
								{item.label}
							</Link>
						) : (
							<span>{item.label}</span>
						)}
						{idx < items.length - 1 && <span className='ml-1'>/</span>}
					</li>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
