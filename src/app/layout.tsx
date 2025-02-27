import '@/assets/styles/globals.css'
import '@/assets/styles/swiper.css'
import CookieConsent from '@/components/CookieConsent'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Metrika from '@/components/metrika/Metrika'
import PageTransition from '@/components/pageTransition/PageTransition'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import '@fontsource-variable/raleway'
import { AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

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
						<Header highlighting />
						{children}
						<Footer />
					</PageTransition>
				</AnimatePresence>
				<CookieConsent
					timeoutInSeconds={5}
					boxClasses='grid grid-cols-[1fr_auto] items-center h-[120px] sm:h-[100px] md:h-[95px]'
				/>
				<ScrollToTop />
				{yId ? <Metrika yId={yId} /> : null}
			</body>
		</html>
	)
}
