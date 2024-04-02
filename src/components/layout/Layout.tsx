import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ReactNode } from 'react'
import FadeIn from '@/components/fadeIn/FadeIn'

interface LayoutProps {
	children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<FadeIn>
				<Header />
			</FadeIn>

			<div>{children}</div>

			<FadeIn>
				<Footer />
			</FadeIn>
		</>
	)
}

export default Layout
