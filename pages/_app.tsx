import '@/assets/styles/globals.css'
import '@/assets/styles/swiper.css'
import type { AppProps } from 'next/app'
import Layout from '@/layout/Layout'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
