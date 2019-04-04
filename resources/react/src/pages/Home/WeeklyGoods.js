import React from 'react'
import CountDown from '../../libs/CountDown'

// 因为编译时会出错，所以加上这个定义 TODO:更改ESLint配置来解决这个问题?2017-10-16
const $ = window.jQuery
const Swiper = window.Swiper
const lib = window.lib

class WeeklyGoods extends React.Component {

	constructor(props) {
		super(props)
		this.initSwiper = this.initSwiper.bind(this)
	}

	componentDidMount () {
		var myLazyLoad = new window.LazyLoad()
		this.initCountDown(this.props.limited_time)
		this.initSwiper()
		this.renderFooterGoods = this.renderFooterGoods.bind(this)
	}

	initSwiper () {
		let swiper_container_padding_left = parseInt($('.timelimit .ui-weekly-goods-body').css('padding-left').replace('px', ''))
		this.init_swiper_timer = setInterval(() => {
			let parent_container_is_visible = $('#page-home').closest('.ui-tabbar-content').css('display') !== 'none'
			if (parent_container_is_visible) {
				this.goods_swiper = new Swiper('.swiper-container-timelimit-goods', {
					speed: 400,
					slidesPerView: 'auto',
					paginationClickable: true,
					slidesOffsetAfter: swiper_container_padding_left,
					freeMode: true
				})
				clearInterval(this.init_swiper_timer)
			}
		}, 1000)
	}

	renderFooterGoods () {
		let { spike_datas } = this.props
		if (!spike_datas.length) return null
		return (
			<section className='footer'>
				{
					spike_datas[0] ? <a href={spike_datas[0].url} className='left img'><img src={spike_datas[0].image} alt='' /></a> : ''
				}
				{
					spike_datas[1] ? <a href={spike_datas[1].url} className='right img'><img src={spike_datas[1].image} alt='' /></a> : ''
				}
			</section>
		)
	}

	weeklyItem (item, index) {
		return <li className='ui-weekly-goods-item swiper-slide' key={index}>
			<a href={item.url}>
				<div className='img'>
					<img src={item.image} alt='' />
					<div className='tag'>
						<i className='iconfont icon-dianpu-ali'></i>{item.shop_name}</div>
				</div>
				<div className='goods-name'>{item.goods_name}</div>
				<div className='price'>
					<strong className='new'>¥{item.price}</strong>
					<span className='old'>¥{item.original_price}</span>
				</div>
			</a>
		</li>
	}

	// 初始化倒计时
	initCountDown (limited_time) {
		new CountDown({
			endTime: limited_time * 1000,
			// 每秒的回调
			onTick: function (data) {
				let parent_container = '.js-countdown '
				$(parent_container + '.hours').text(data.hours)
				$(parent_container + '.minutes').text(data.minutes)
				$(parent_container + '.seconds').text(data.seconds)
			},
			onTimeEnd: function () { //结束回调
				window.location.reload()
				// TODO: 如果接口数据中的数据本身就到时间，是否会出现一直刷新的问题
			}
		})
	}

	render () {
		let { limited_text, limited_time } = this.props
		return (
			<div className='ui-weekly-goods timelimit'>
				<section className='header'>
					<div className='left'>
						<strong className='title'>今日秒杀</strong>
						<div className='countdown'>
							<span className='label'>{limited_text}</span>
							<div className='left-time js-countdown' data-timestamp={limited_time}>
								<em className='item hours'>00</em>:&nbsp; <em className='item minutes'>00</em>:&nbsp; <em className='item seconds'>00</em>
							</div>
						</div>
					</div>
					<span className='right'>
						<a href='/wap/xizicard/goods-list'>更多<i className='iconfont icon-jiantou-copy-copy'></i>
						</a>
					</span>
				</section>
				<section className='swiper-container-timelimit-goods'>
					<ul className='ui-weekly-goods-body swiper-wrapper'>
						{this.props.data.map(this.weeklyItem)}
						<a className='ui-weekly-goods-item swiper-slide' href='/wap/xizicard/goods-list'>
							<div className='link'> 更<br />多<br />秒<br />杀  </div>
						</a>
					</ul>
				</section>
				{this.renderFooterGoods()}
			</div>
		)
	}
}

export default WeeklyGoods
