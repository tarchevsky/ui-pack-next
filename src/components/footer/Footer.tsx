import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='footer p-10 text-neutral-content'>
			<nav>
				<h6 className='footer-title'>Services</h6>
				<Link href='/' className='link link-hover'>
					Branding
				</Link>
				<Link href='/' className='link link-hover'>
					Design
				</Link>
				<Link href='/' className='link link-hover'>
					Marketing
				</Link>
				<Link href='/' className='link link-hover'>
					Advertisement
				</Link>
			</nav>
			<nav>
				<h6 className='footer-title'>Company</h6>
				<Link href='/' className='link link-hover'>
					About us
				</Link>
				<Link href='/' className='link link-hover'>
					Contact
				</Link>
				<Link href='/' className='link link-hover'>
					Jobs
				</Link>
				<Link href='/' className='link link-hover'>
					Press kit
				</Link>
			</nav>
			<nav>
				<h6 className='footer-title'>Legal</h6>
				<Link href='/' className='link link-hover'>
					Terms of use
				</Link>
				<Link href='/' className='link link-hover'>
					Privacy policy
				</Link>
				<Link href='/' className='link link-hover'>
					Cookie policy
				</Link>
			</nav>
		</footer>
	)
}

export default Footer
