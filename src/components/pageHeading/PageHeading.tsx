import FadeIn from '@/components/fadeIn/FadeIn'

interface PageHeadingProps {
	title: string
}

const PageHeading = ({ title }: PageHeadingProps) => {
	return (
		<>
			<FadeIn className='ind cont'>
				<main>
					<h1 className={`text-4xl font-bold`}>{title}</h1>
				</main>
			</FadeIn>
		</>
	)
}

export default PageHeading
