import { HtagProps } from '@/types'
import { Fragment, memo } from 'react'

const Htag = memo(({ tag, children, className }: HtagProps) => {
	const Tag = tag

	const renderContent = () => {
		if (typeof children === 'string') {
			return children.split('<br />').map((text, index, array) => (
				<Fragment key={index}>
					{text}
					{index < array.length - 1 && <br />}
				</Fragment>
			))
		}
		return children
	}

	return <Tag className={className}>{renderContent()}</Tag>
})

Htag.displayName = 'Htag'

export default Htag
