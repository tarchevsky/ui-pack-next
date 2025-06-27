import Link from 'next/link'

interface ContactProps {
	type: 'email' | 'tel' | 'address'
	data: String
	className?: string
}

const Contact = ({ type, data, className }: ContactProps) => {
	const content =
		{
			email: (
				<Link className={className} href={`mailto:${data}`}>
					{data}
				</Link>
			),
			tel: (
				<Link className={className} href={`tel:${data}`}>
					{data}
				</Link>
			),
			address: <p className={className}>{data}</p>
		}[type] || null

	return content
}

export default Contact
