import Head from 'next/head'
import { MetaProps } from '@/types'

const Meta = ({ title, metaDesc }: MetaProps) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={metaDesc} />
		</Head>
	)
}

export default Meta
