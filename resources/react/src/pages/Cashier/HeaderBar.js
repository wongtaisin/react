import React from 'react'

// 顶部栏
export default class HeaderBar extends React.Component {

	constructor(props) {
		super(props)
	}

	render () {
		return (
			<section className='ui-cashier-header-bar'>
				<div className='left'>
					<span className='ui-cashier-small-logo' />
					<span>线下收银</span>
				</div>
				<span className='shopname'>{this.props.shopname}</span>
			</section>
		)
	}
}
