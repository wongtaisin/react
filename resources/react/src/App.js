import React from 'react'
import { RouteTransition } from 'react-router-transition'

const App = React.createClass({
	propTypes: {
		route: React.PropTypes.object,
		location: React.PropTypes.object
	},

	contextTypes: {
		router: React.PropTypes.object
	},

	render () {
		return (
			<div>
				<RouteTransition
					component={false}
					pathname={this.props.location.pathname}
					className='transition-wrapper'
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
				>
					{this.props.children}
				</RouteTransition>
			</div>
		)
	}
})

export default App