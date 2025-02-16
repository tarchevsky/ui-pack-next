import FadeIn from '@/components/fadeIn/FadeIn'

interface PageHeadingProps {
	title: string
	ind?: boolean
}

const PageHeading = ({ title, ind = false }: PageHeadingProps) => {
	return (
		<>
			<FadeIn className={`cont${ind ? ' ind' : ''}`}>
				<main>
					<h1 className={`text-4xl font-bold`}>{title}</h1>
				</main>
			</FadeIn>
		</>
	)
}

export default PageHeading
