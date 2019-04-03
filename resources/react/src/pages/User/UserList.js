import React from 'react'

export default class QRCodeBox extends React.Component {

	constructor(props) {
		super(props)
	}

	renderItem (item, index) {
		let USER_NUM = null
		if (item.num) USER_NUM = <div className='ui-user-list-text'><span>{item.num}</span><span>{item.numText}</span></div>

		return <li className='ui-user-list-item' key={index}>
			<div className={`iconfont ${item.icon}`}></div>
			<div className='item-main'>
				<div className='ui-user-list-title'>{item.name}</div>
				{USER_NUM}
				<div className='iconfont icon-arrowright'></div>
			</div>
		</li>
	}

	render () {
		return (
			<ul className='ui-user-list'>
				{this.props.data.map(this.renderItem)}
			</ul>
		)
	}
}
