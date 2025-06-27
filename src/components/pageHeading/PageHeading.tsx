import type { BreadcrumbItem } from '@/components/breadcrumbs/Breadcrumbs'
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import FadeIn from '@/components/fadeIn/FadeIn'
import { cn } from '@/utils/cn'

interface PageHeadingProps {
	title: string
	className?: string
	ind?: boolean
	breadcrumbs?: BreadcrumbItem[]
}

const PageHeading = ({
	title,
	ind = false,
	className,
	breadcrumbs
}: PageHeadingProps) => {
	return (
		<>
			<FadeIn className={cn(className, ind)}>
				<main>
					{breadcrumbs && breadcrumbs.length > 0 && (
						<Breadcrumbs items={breadcrumbs} className='mb-2' />
					)}
					<h1 className={`text-6xl font-medium uppercase`}>{title}</h1>
				</main>
			</FadeIn>
		</>
	)
}

export default PageHeading
