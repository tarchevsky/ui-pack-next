import '@/assets/styles/globals.css'
import '@/assets/styles/swiper.css'
import FadeIn from '@/components/fadeIn/FadeIn'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Metrika from '@/components/metrika/Metrika'
import PageTransition from '@/components/pageTransition/PageTransition'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
// Supports weights 100-900
import '@fontsource-variable/raleway'

const yId = process.env.NEXT_PUBLIC_YID

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='ru'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
				/>
			</head>
			<body>
				<AnimatePresence>
					<PageTransition>
						<FadeIn className='cont'>
							<Header />
						</FadeIn>
						{children}
						<FadeIn>
							<Footer />
						</FadeIn>
					</PageTransition>
				</AnimatePresence>
				<ScrollToTop />
				{yId ? <Metrika yId={yId} /> : null}
			</body>
		</html>
	)
}
