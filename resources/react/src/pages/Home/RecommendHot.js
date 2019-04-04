import React from 'react'

class RecommendHot extends React.Component {

	RecommendHotItem (item, index) {
		return <li className='ui-recommend-hot-item' key={index}>
			<img src={item.image} alt='' />
			<div className='name'>
				<span className='tag'>美食</span>
				<span className='title'>{item.title}</span>
			</div>
			<div className='footer'>
				<span className='left'>¥{item.price}</span>
				<span className='right'>立即抢购</span>
			</div>
		</li>
	}

	render () {
		return (
			<section className='ui-recommend-hot'>
				<h3 className='section-title section-title-bg'>
					<span>火爆单品</span>
				</h3>
				<p className='section-description'>惠州好商品 只想推荐给你买</p>
				<ul className='ui-recommend-hot-body'>
					{this.props.data.map(this.RecommendHotItem)}
				</ul>
			</section>
		)
	}
}

export default RecommendHot
