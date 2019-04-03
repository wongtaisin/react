import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => (
	<li>
		<Link to={`${props.link}`}>{props.children}</Link>
	</li>
)

export default ListItem
