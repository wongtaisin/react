import React from 'react'

export default class NavigationPage extends React.Component {
	render () {
		return (
			<section>{this.props.children}</section>
		)
	}
}
