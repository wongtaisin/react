import React from 'react'
import { Link } from 'react-router-dom'

class ActivityItem extends React.Component {

	constructor(props) {
		super(props)
	}

	// 点击跳转路由
	handleRouter (id) {
		console.log(id)
	}

	renderList () {
		return this.props.data.map((item, index) => {
			return <li className='ui-activitys-item swiper-slide' key={index} onClick={this.handleRouter.bind(this, item.id)} >
				<Link to={`/cashier?id=${item.id}`}>
					<img src={item.cover_img} />
					<div className='name'>
						<span className='tag'>{item.category}</span>
						<span className='title'>{item.title}</span>
					</div>
					<div className='footer'>
						<span className='left'>报名截止：{item.end_time}</span>
						<span className='right'>{item.button}</span>
					</div>
				</Link>
			</li>
		})
	}

	render () {
		return (
			<ul className='ui-activitys-body swiper-wrapper' >
				{this.renderList()}
			</ul>
		)
	}
}

export default class Activitys extends React.Component {

	constructor(props) {
		super(props)
		this.initSwiper = this.initSwiper.bind(this)
	}

	componentDidMount () {
		this.initSwiper()
	}

	initSwiper () {
		this.goods_swiper = new window.Swiper('.swiper-container-home-activitys', {
			speed: 400,
			// autoplay: 2000,
			slidesPerView: 1
		})
	}

	render () {
		let { data } = this.props
		return (
			<section className='ui-activitys'>
				<h3 className='section-title section-title-bg'>
					<span>惠州活动</span>
				</h3>
				<p className='section-description'>汇聚好活动 精彩纷呈等你来</p>
				<section className='swiper-container-home-activitys'>
					<ActivityItem data={data} />
				</section>
			</section>
		)
	}
}
