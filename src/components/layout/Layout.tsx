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
			<div className='cont'>
				<FadeIn>
					<Header delay={0.1} />
				</FadeIn>
			</div>

			<main>
				<FadeIn>{children}</FadeIn>
			</main>

			<div className='cont'>
				<FadeIn>
					<Footer />
				</FadeIn>
			</div>
		</>
	)
}

export default Layout
