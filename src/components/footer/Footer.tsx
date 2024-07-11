import Link from 'next/link'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaSquarePhone } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'

const Footer = () => {
	return (
		<footer className='footer footer-center p-10 bg-base-200 text-base-content rounded'>
			<nav className='grid grid-flow-col gap-4'>
				<Link href='/about' className='link link-hover'>
					О нас
				</Link>
				<Link href='/' className='link link-hover'>
					Контакты
				</Link>
			</nav>
			<nav>
				<div className='grid grid-flow-col gap-4'>
					<Link href='/' area-label='Telegram link'>
						<FaTelegramPlane className='fill-primary' size={25} />
					</Link>
					<Link href='/' area-label='Whatsapp link'>
						<IoLogoWhatsapp className='fill-primary' size={25} />
					</Link>
					<Link href='/' area-label='Phone link'>
						<FaSquarePhone className='fill-primary' size={25} />
					</Link>
				</div>
			</nav>
			<aside>
				<p>Copyright © 2024 - Тарчевский И.А.</p>
			</aside>
		</footer>
	)
}

export default Footer
