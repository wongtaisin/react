import React from 'react'

const ListHeader = (props) => (
	<section className='ui-list-header'>
		<span className='left'>{props.children}</span>
	</section>
)

export default ListHeader
