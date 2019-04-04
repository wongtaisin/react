import React from 'react'

const tabs_config = [
	{ label: '首页', icon: 'icon-shouye' },
	{ label: '惠州商家', icon: 'icon-dianzan' },
	{ label: '活动', icon: 'icon-qiqiu' },
	{ label: '购物车', icon: 'icon-gouwuche2' },
	{ label: '我的', icon: 'icon-wode' }
]

export default class TabBar extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			current_index: 0
		}

		this.renderItems = this.renderItems.bind(this)
	}

	onClickItem (index) {
		this.setState({
			current_index: index
		})
	}

	renderItems () {
		return tabs_config.map((item, index) => {
			return (
				<div
					className={`ui-tabbar-item ${this.state.current_index === index ? 'active' : ''}`}
					onClick={this.onClickItem.bind(this, index)}
					key={index}
				>
					<span style={{ display: 'inline-block', position: 'relative' }}>
						<div className={`iconfont ${item.icon}`}></div>
					</span>
					<p className='ui-tabbar-label'>{item.label}</p>
				</div>
			)
		})
	}

	render () {
		return (
			<section className='ui-tabbar'> {this.renderItems()} </section>
		)
	}
}
