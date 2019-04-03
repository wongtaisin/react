import React from 'react'
import NavigationBar from './NavigationBar' //顶部导航条
import Spinner from '../../components/Spinner'

import FilterBar from './FilterBar'
import Utils from '../../Utils'

//因为编译时会出错，所以加上这个定义 TODO:更改ESLint配置来解决这个问题?2017-10-16
const $ = window.jQuery

// 暂无数据提示
const EmptyTip = () => {
	return <div className='ui-empty-tip-shop-list'></div>
}

// 评分星星
const RateStars = ({ star_value }) => {
	//计算宽度
	let width = (parseInt(star_value) / 5) * 100
	let style = {
		width: `${width}%`
	}
	return (<div className='star-ratings'>
		<div className='star-ratings-fill' style={style}>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div className='star-ratings-empty'>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>)
}

// 商铺列表
class ShopList extends React.Component {

	constructor(props) {
		super(props)
		this.renderShopList = this.renderShopList.bind(this)
	}

	onClickShopListItem (shop) {
		window.location.href = shop.url
	}

	renderShopList () {
		return this.props.data.map((item, index) => {
			let RATE_TPL = item.star <= 0 ? (<div className='ui-shop-list-rate'>
				<span>口碑</span>
				<span className='rate-star'>
					<RateStars star_value={item.star} />
				</span>
				<span className='rate-num'>
					{item.star}</span>
			</div>) : "暂无点评"

			return (
				<li className='ui-shop-list-item' onClick={this.onClickShopListItem.bind(this, item)} key={index}>
					<img className='ui-shop-list-left' src={item.image} />
					<div className='ui-shop-list-right'>
						<p className='ui-shop-list-title'>{item.name}</p>
						<span className='ui-shop-list-count'>到店 {item.count}</span>
						{RATE_TPL}
					</div>
				</li>
			)
		})
	}

	render () {
		// let {data} = this.props
		// if (!data.length)return <EmptyTip/>

		return (
			<ul className='ui-shop-list'>
				{/*{this.renderShopList()}*/}
				<li className='ui-shop-list-item'>
					<img className='ui-shop-list-left' src='http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg' />
					<div className='ui-shop-list-right'>
						<p className='ui-shop-list-title'>name</p>
						<span className='ui-shop-list-count'>到店 count</span>
						暂无点评
					</div>
				</li>
				<li className='ui-shop-list-item'>
					<img className='ui-shop-list-left' src='http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg' />
					<div className='ui-shop-list-right'>
						<p className='ui-shop-list-title'>name</p>
						<span className='ui-shop-list-count'>到店 count</span>
						<div className='ui-shop-list-rate'>
							<span>口碑</span>
							<span className='rate-star'>
								<RateStars star_value='5' />
							</span>
							<span className='rate-num'>5</span>
						</div>
					</div>
				</li>
			</ul>
		)
	}
}

export default class ShopListPage extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			current_index: 0,
			shop_data: [],
			page: 1
		}

		this.isLoading = false
		this.is_lastpage = false
		this.initiated = false //页面是否完成初始化(是否已执行this.initPage() )

		window.current_navigation_id = typeof window.current_navigation_id != 'undefined' ? window.current_navigation_id : 0
		window.current_navigation_page = 1

		this.onClickFilterBarItem = this.onClickFilterBarItem.bind(this)
		this.onChildClick = this.onChildClick.bind(this)

		this.fetchNavData = this.fetchNavData.bind(this) //Nav数据

		this.fetchShops = this.fetchShops.bind(this)
		this.onScrollBottom = this.onScrollBottom.bind(this)
		this.initPage = this.initPage.bind(this)
		this.addCustomEventListener = this.addCustomEventListener.bind(this)

	}

	// 顶部数据数据
	fetchNavData () {
		// $.get(`/wap/react/shop-cate-list`, (res) => {
		// 	if (res.code == 0) return this.setState({ shop_nav: res.data })
		// })

		this.setState({
			shop_nav: [
				{
					id: 0,
					name: '车行'
				},
				{
					id: 1,
					name: '商行'
				},
				{
					id: 2,
					name: '琴行'
				},
				{
					id: 3,
					name: '餐饮'
				}
			]
		})
	}

	// 初始化
	addCustomEventListener () {
		document.addEventListener("shops", this.initPage)
	}

	// 滑动加载
	onScrollBottom () {
		$(window).on('scroll', () => {
			if (this.is_lastpage) return false
			if (window.current_tab_name !== 'shops') return false
			if (window.innerHeight + window.scrollY + 30 >= document.body.scrollHeight) this.fetchShops(window.current_navigation_id, window.current_navigation_page)
		})
	}

	// 获取店铺数据
	fetchShops (id, page) {
		let { shop_data } = this.state
		if (this.isLoading) return false
		this.isLoading = true
		$.get(`/wap/react/shop-list?category_id=${id}&page=${page}`, (res) => {
			this.isLoading = false
			if (res.code == 0) {
				if (res.data.length == 0) this.is_lastpage = true
				this.setState({
					shop_data: shop_data.concat(res.data)
				})
				window.current_navigation_page++
			}
		})
	}

	//顶部导航被点击
	onClickFilterBarItem (index) {
		this.setState({ current_index: index })
	}

	// 传递给子组件的方法
	onChildClick (value) {
		this.setState({ shop_data: value })
	}

	// 初始化页面、获取数据、添加监听事件等
	initPage () {
		if (this.initiated) return false
		// 获取地址栏中的id
		let category_id = Utils.getUrlParam('category_id') || 0
		this.fetchNavData()
		this.fetchShops(category_id, 1)
		this.onScrollBottom()
		// var myLazyLoad = new window.LazyLoad() 初始化图片延时加载
		this.initiated = true
	}

	componentDidMount () {
		this.initPage()

		// if( Utils.getUrlParam('module') == 'shops' ){
		//   this.initPage()
		// }else{
		//   this.addCustomEventListener()
		// }
	}

	render () {
		let { shop_nav, shop_data } = this.state
		if (!shop_nav) return (<Spinner />)
		return (<section id='page-shop-list'>
			{/* <NavigationBar onClickFilterBarItem={this.onClickFilterBarItem} data={shop_nav} onChildClick={this.onChildClick}/>
            <FilterBar onClickFilterBarItem={this.onClickFilterBarItem.bind(this)}/>
            <ShopList data={this.state.shop_data}/> */}
			<NavigationBar data={shop_nav} onClickFilterBarItem={this.onClickFilterBarItem} onChildClick={this.onChildClick} />
			<FilterBar onClickFilterBarItem={this.onClickFilterBarItem.bind(this)} />
			<ShopList />
		</section>)
	}
}
