import React from 'react'
import SwiperBox from './SwiperBox' // 焦点图
import Activitys from './Activitys' // 活动
import WeeklyGoods from './WeeklyGoods' // 每周限购
import NavigationBar from './NavigationBar' // 顶部导航条
import NavigationPage from './NavigationPage'
import RecommendCate from './RecommendCate' // 推荐分类
import RecommendHot from './RecommendHot' //  推荐单品
import RecommendGrids from './RecommendGrids' // 推荐格子
import QRCodeBox from './QRCodeBox' // 底部二维码
import GoodsList from './GoodsList' // 首页其他分类产品列表
import Spinner from '../../components/Spinner' //  加载
import Utils from '../../Utils'

// 因为编译时会出错，所以加上这个定义 TODO:更改ESLint配置来解决这个问题?2017-10-16
const $ = window.jQuery

export default class PageHome extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			navigation_page_index: 0,
			data: null,
			cate_data: null
		}

		this.fetchHomeData = this.fetchHomeData.bind(this) //Home数据
		this.onClickNavigationBarItem = this.onClickNavigationBarItem.bind(this)
		this.renderNavigationPages = this.renderNavigationPages.bind(this)
		this.onChildClick = this.onChildClick.bind(this)

	}

	// 顶部导航被点击
	onClickNavigationBarItem (index) {
		this.setState({
			navigation_page_index: index
		})
	}

	// 获取Home数据
	fetchHomeData () {

		// $.get(`/wap/react/index`, (res) => {
		// 	if (res.code == 0) {
		// 		//微信访问, 设置微信分享数据
		// 		if (window.is_wx && window.wx && res.data.share_info) {
		// 			let { title, desc, imgUrl, link } = res.data.share_info
		// 			window.wx.ready(function () {
		// 				window.wx.onMenuShareTimeline({
		// 					title: title, // 分享标题
		// 					link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
		// 					imgUrl: imgUrl
		// 				})
		// 				window.wx.onMenuShareAppMessage({
		// 					title: title, // 分享标题
		// 					desc: desc, // 分享描述
		// 					link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
		// 					imgUrl: imgUrl
		// 				})
		// 			})
		// 		}
		// 		return this.setState({
		// 			data: res.data,
		// 			navigation_page_index: this.getDefaultNavigationIndex(res.data.category_heads)
		// 		})
		// 	}
		// })

		let res = {
			data: {
				slider_imgs: [
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg'
					}, {
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540034823709&di=89963223993f1eceb63bd7989a82a810&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2015-02-05%2F173116991.jpg'
					}
				],
				menu_categorys: [
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: 'icon1'
					}, {
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: 'icon2'
					}, {
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: 'icon3'
					}, {
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: 'icon4'
					}
				],
				limited_goods: [
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						shop_name: '格子',
						goods_name: '名字',
						price: '1024',
						original_price: '2048'
					}
				],
				spike_datas: [
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg'
					}, {
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540034823709&di=89963223993f1eceb63bd7989a82a810&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2015-02-05%2F173116991.jpg'
					}
				],
				adds: {
					left_datas: [
						{
							image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg'
						}
					],
					right_datas: [
						{
							image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540034823709&di=89963223993f1eceb63bd7989a82a810&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2015-02-05%2F173116991.jpg'
						}, {
							image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg'
						}
					]
				},
				hot_goods: [
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: '名字',
						price: '1024'
					}
				],
				activities: [
					{
						id: 999,
						cover_img: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						category: '格子',
						title: '名字',
						end_time: '2019-01-01',
						button: '按钮'
					}
				],
				category_heads: [
					{
						category_id: 0,
						title: '一元素'
					}, {
						category_id: 1,
						title: '二元素'
					}, {
						category_id: 2,
						title: '三元素'
					}, {
						category_id: 3,
						title: '四元素'
					}, {
						category_id: 4,
						title: '五元素'
					}, {
						category_id: 5,
						title: '六元素'
					}
				]
			},
			cate_data: {
				banner: [
					{ image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540034823709&di=89963223993f1eceb63bd7989a82a810&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2015-02-05%2F173116991.jpg' },
					{ image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg' }
				],
				goods_lists: [
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: '格子',
						price: '名字'
					},
					{
						image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540034823709&di=89963223993f1eceb63bd7989a82a810&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2015-02-05%2F173116991.jpg',
						title: '格子',
						price: '名字'
					},
					{
						image: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
						title: '格子',
						price: '名字'
					}
				]
			}
		}

		this.setState({
			data: res.data,
			cate_data: res.cate_data,
			navigation_page_index: this.getDefaultNavigationIndex(res.data.category_heads)
		})

	}

	/**
	 * 根据url中的category_id参数,获取顶部栏目的index
	 * @param {Array} data 栏目数组
	 */
	getDefaultNavigationIndex (data) {
		let found_index = 0
		let category_id = Utils.getUrlParam('category_id')
		if (!category_id) return false
		data.map((item, index) => {
			if (item.category_id === category_id) found_index = index
		})
		return found_index
	}

	componentDidMount () {
		this.fetchHomeData()
		var myLazyLoad = new window.LazyLoad() //初始化图片延时加载
	}

	// 渲染顶部导航的内容页
	renderNavigationPages () {

		let { data, cate_data } = this.state

		// 如果是首页
		if (this.state.navigation_page_index === 0) {
			return (
				<NavigationPage>
					<SwiperBox data={data.slider_imgs} />
					<RecommendCate data={data.menu_categorys} />
					<WeeklyGoods data={data.limited_goods} spike_datas={data.spike_datas} limited_text='世界杯' limited_time='2019-01-01' />
					<RecommendGrids data={data.adds} />
					<Activitys data={data.activities} />
					<RecommendHot data={data.hot_goods} />
					<QRCodeBox />
				</NavigationPage>
			)
		}

		// 其他分类页面
		return (
			<NavigationPage>
				<SwiperBox data={cate_data.banner} />
				<GoodsList data={cate_data.goods_lists} />
			</NavigationPage>
		)
	}

	/** 
	 * 传递给子组件的方法
	 * onChildClick 传递事件
	 */
	onChildClick (value) {
		this.setState({
			cate_data: value
		})
	}

	render () {
		let { data } = this.state
		if (!data) return (<Spinner />)

		return (<section id='page-home'>
			<NavigationBar onClickNavigationBarItem={this.onClickNavigationBarItem} data={data.category_heads} onChildClick={this.onChildClick} />
			{this.renderNavigationPages()}
		</section>)
	}
}