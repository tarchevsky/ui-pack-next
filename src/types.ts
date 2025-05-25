import type { Url } from 'next/dist/shared/lib/router/router'
import type { ReactNode } from 'react'

// Metrika.tsx

export interface MetrikaProps {
	yId: string
}

// Htag.tsx

export interface HtagProps {
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	children: string | ReactNode
	className?: string
}

// Button.tsx

export interface ButtonProps {
	tag: 'button' | 'link'
	type?: 'button' | 'submit'
	text: string
	ariaLabel: string
	href?: Url | string
	className?: string
	modalContent?: string | ReactNode
}

// Layout.tsx + FadeIn.tsx

export interface LayoutProps {
	tag?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'article'
	children: ReactNode
	className?: string
	delay?: number
	style?: string
}

// HeaderProps

export interface MenuItem {
	path: string
	label: string
}

export interface HeaderProps {
	highlighting?: boolean
	isBurgerVersion?: boolean
}

// FigureProps

export interface FigureProps {
	link?: string
	src: string
	caption: string
	width?: number
	height?: number
	linkClass?: string
	figureClass?: string
	imageClass?: string
	figcaptionClass?: string
	unoptimized?: boolean
}

// Hero.tsx

export interface ModalContentProps {
	onSuccess?: (message: string) => void
	closeIcon?: boolean
}

export interface HeroProps {
	title: string
	src: string
	buttonText?: string
	alt: string
	subtitle?: string
	unoptimized?: boolean
	modalContent?: ReactNode | React.ReactElement<ModalContentProps>
	closeIcon?: boolean
	config?: 'center' | 'cover'
}

// Accordion.tsx

export interface AccordionProps {
	tab1: string
	content1: string
	tab2: string
	content2: string
	tab3: string
	content3: string
}

// index.tsx

export interface PageProps {
	posts: PostProps[]
	page: any
	node: any
	pageId: string
}

// [postSlug].tsx

export interface Params {
	postSlug: string
}

export type Site = {
	title: string
}

export interface PostEdge {
	node: {
		id: string
		title: string
		slug: string
		content: string
	}
}

export interface PostPageProps {
	post: PostProps
	site: Site
	path: string
	content: string
}

// index.tsx + [postSlug].tsx

export type PostProps = {
	slug: string
	title: string
	excerpt: string
	path: string
	content: string
	seo: {
		title: string
		metaDesc: string
	}
}

// Burger.tsx

export interface BurgerProps {
	toggleMenu: () => void
	isActive: boolean
	className?: string
	isBurgerVersion?: boolean
}

// ThemeToggle.tsx

export interface ThemeToggleProps {
	className?: string
}

// Images & Masonry

export interface ImageItem {
	id: string
	src: string
	alt: string
	quality?: number
}

export interface MasonryProps {
	images: ImageItem[]
}

// Carousel

export interface SlidesProps {
	id: number
	src: string
	alt: string
	title: string
	description: string
}

export interface CarouselProps {
	slides: SlidesProps[]
	navigationPosition?: 'side' | 'bottom'
	paginationPosition?: 'inside' | 'outside'
	height?: {
		mobile?: string
		desktop?: string
	}
	sideNavWidth?: {
		mobile?: string
		desktop?: string
	}
	bottomNav?: {
		marginBottom?: {
			mobile?: string
			desktop?: string
		}
		arrowsOffset?: {
			mobile?: string
			desktop?: string
		}
	}
	pagination?: {
		offset?: {
			mobile?: string
			desktop?: string
		}
	}
	arrows?: {
		size?: {
			mobile?: string
			desktop?: string
		}
		iconSize?: {
			mobile?: string
			desktop?: string
		}
	}
}
