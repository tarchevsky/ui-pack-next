import Meta from '@/components/meta/Meta'
import FadeIn from '@/components/fadeIn/FadeIn'
import { MetaProps } from '@/types'

const PageHeading = ({ title, metaDesc }: MetaProps) => {
	return (
		<>
			<Meta title={title} metaDesc={metaDesc} />
			<FadeIn className='cont mb-16'>
				<main>
					<h1 className={`text-4xl font-bold`}>{title}</h1>
				</main>
			</FadeIn>
		</>
	)
}

export default PageHeading
