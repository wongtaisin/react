import React from 'react'

class NavigationBar extends React.Component {
	constructor(props) {
		super(props)
	}

	render () {
		let { pathname } = this.props.history.location
		let isRootPage = /\/home/.test(pathname)
		console.log(this.props)
		console.log(isRootPage)
		let navbar_content = isRootPage ? <strong>XMUI</strong> : <i className='iconfont ion-navicon' />

		return (
			<header className='ui-navbar'>
				<a href='javascript:;' className='brand-name'>
					{navbar_content}
					{isRootPage === false ? <span className='title'>Toast</span> : ''}
				</a>
			</header>
		)
	}
}

export default NavigationBar
