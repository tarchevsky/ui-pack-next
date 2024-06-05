import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ReactNode } from 'react'
import FadeIn from '@/components/fadeIn/FadeIn'
import { LayoutProps } from '@/types'

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<FadeIn className='cont'>
				<Header />
			</FadeIn>

			{children}

			<FadeIn>
				<Footer />
			</FadeIn>
		</>
	)
}

export default Layout
