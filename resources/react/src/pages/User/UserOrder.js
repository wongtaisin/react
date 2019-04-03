import React from 'react'

export default class UserOrder extends React.Component {

	constructor(props) {
		super(props)
	}

	renderItem (item, index) {
		return <div className='ui-order-box' key={index} >
			<i className={`iconfont ${item.icon}`}></i>
			<p>{item.name}</p>
		</div>
	}

	render () {
		return (
			<div className='ui-order'>
				<div className='ui-order-title'>
					<div className='ui-order-title-name'>我的订单</div>
					<div className='ui-order-title-value'>查看全部订单<i className='iconfont icon-arrowright'></i></div>
				</div>
				<div className='ui-order-nav'>
					{this.props.data.map(this.renderItem)}
				</div>
			</div>
		)
	}
}
