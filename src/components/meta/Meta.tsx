import type { MetaProps } from '@/types'
import Head from 'next/head'

const Meta = ({ title, metaDesc }: MetaProps) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={metaDesc} />
		</Head>
	)
}

export default Meta
