import Link from 'next/link'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaSquarePhone } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'

const Footer = () => {
	const year = new Date().getFullYear()

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
					<Link href='/' aria-label='Telegram link'>
						<FaTelegramPlane className='fill-primary' size={25} />
					</Link>
					<Link href='/' aria-label='Whatsapp link'>
						<IoLogoWhatsapp className='fill-primary' size={25} />
					</Link>
					<Link href='/' aria-label='Phone link'>
						<FaSquarePhone className='fill-primary' size={25} />
					</Link>
				</div>
			</nav>
			<aside>
				<p>Copyright © {year} - tezis.digital</p>
			</aside>
		</footer>
	)
}

export default Footer
