import '@/assets/styles/globals.css'
import '@/assets/styles/swiper.css'
import Metrika from '@/components/metrika/Metrika'
import PageTransition from '@/components/pageTransition/PageTransition'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import Layout from '@/layout/Layout'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

const yId = process.env.NEXT_PUBLIC_YID // id яндекс метрики

export default function App({ Component, pageProps, router }: AppProps) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return null // Или можно вернуть загрузочный экран, пока клиент не инициализирован
	}

	return (
		<>
			{/* <CustomCursor /> */}
			<AnimatePresence>
				<PageTransition key={router.route}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</PageTransition>
			</AnimatePresence>
			<ScrollToTop />
			{yId ? <Metrika yId={yId} /> : null}
		</>
	)
}
