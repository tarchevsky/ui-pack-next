import Link from 'next/link'

export interface SidebarItem {
	title: string
	href?: string
	isExpanded?: boolean
	children?: SidebarItem[]
}

interface SidebarProps {
	items: SidebarItem[]
	className?: string
}

export const Sidebar = ({ items, className = '' }: SidebarProps) => {
	return (
		<div className={`menu py-4 px-0 ${className}`}>
			<SidebarItems items={items} />
		</div>
	)
}

interface SidebarItemsProps {
	items: SidebarItem[]
	level?: number
}

const SidebarItems = ({ items, level = 0 }: SidebarItemsProps) => {
	return (
		<ul className={level === 0 ? 'menu-item' : ''}>
			{items.map((item, index) => (
				<SidebarItemComponent
					key={`${item.title}-${index}`}
					item={item}
					level={level}
				/>
			))}
		</ul>
	)
}

interface SidebarItemComponentProps {
	item: SidebarItem
	level: number
}

const SidebarItemComponent = ({ item, level }: SidebarItemComponentProps) => {
	const hasChildren = item.children && item.children.length > 0

	if (hasChildren) {
		return (
			<li>
				<details open={item.isExpanded}>
					<summary>{item.title}</summary>
					<SidebarItems items={item.children || []} level={level + 1} />
				</details>
			</li>
		)
	}

	if (item.href?.startsWith('#')) {
		return (
			<li>
				<a href={item.href}>{item.title}</a>
			</li>
		)
	}

	return (
		<li>
			{item.href ? (
				<Link href={item.href}>{item.title}</Link>
			) : (
				<span>{item.title}</span>
			)}
		</li>
	)
}
