import React from 'react'
import Spinner from '../../components/Spinner' // 加载

const EmptyTip = () => {
	return <div className='ui-empty-tip-goods-list'></div>
}

export default class GoodsList extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount () {
		var myLazyLoad = new window.LazyLoad()
	}

	render () {

		if (!this.props.data) return null
		if (!this.props.data.length) return (<EmptyTip />)

		const GOODS_LIST = this.props.data.map((item, index) => {
			return (
				<a key={index} className='ui-goods-list-item' href={item.url}>
					<img className='ui-goods-list-left ui-goods-list-img' src={item.image} />
					<div className='ui-goods-list-right'>
						<h3 className='ui-goods-list-title'>{item.title}</h3>
						<p className='ui-goods-list-price'>¥ {item.price}</p>
						<span className='ui-goods-list-buy' href={item.url}>去购买</span>
					</div>
				</a>
			)
		})

		return (
			<section className='ui-goods-list'>{GOODS_LIST}</section>
		)
	}
}
