import React from 'react'

export default class TabBar extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			current_index: 0
		}

		this.renderItems = this.renderItems.bind(this)
		this.renderTabBarContents = this.renderTabBarContents.bind(this)
	}

	onClickItem (index) {
		this.setState({
			current_index: index
		})
	}

	renderItems () {
		return this.props.data.map((item, index) => {
			return (
				<div
					className={`ui-tabbar-item ${this.state.current_index === index ? 'active' : ''}`}
					onClick={this.onClickItem.bind(this, index)}
					key={index}
				>
					<div className={`iconfont ${item.icon}`}></div>
					<p className='ui-tabbar-label'>{item.label}</p>
				</div>
			)
		})
	}

	renderTabBarContents () {
		return this.props.data.map((item) => {
			return item.component
		})
	}

	render () {

		return (
			<section className='ui-tabbar-container'>
				<section className='ui-tabbar-contents'>{this.renderTabBarContents()}</section>
				<section className='ui-tabbar'>{this.renderItems()}</section>
			</section>
		)
	}
}
