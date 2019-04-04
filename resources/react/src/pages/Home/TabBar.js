import React from 'react'
import Utils from '../../Utils'

// 因为编译时会出错，所以加上这个定义 TODO:更改ESLint配置来解决这个问题 2017-10-16
const $ = window.jQuery

// 底部Tab栏
export default class TabBar extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			current_index: this.getDefaultTabIndex(),
			cart_count: 0
		}

		this.renderItems = this.renderItems.bind(this)
		this.renderTabBarContents = this.renderTabBarContents.bind(this)
		this.fetchCartTabCount = this.fetchCartTabCount.bind(this)
		this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this)
	}

	componentDidMount () {
		// 获取TAB中购物车的角标数据
		this.fetchCartTabCount()
		this.initCurrentTabName()
	}

	initCurrentTabName () {
		if (Utils.getUrlParam('module')) {
			window.current_tab_name = Utils.getUrlParam('module')
		}
	}

	dispatchCustomEvent (item) {
		let need_dispatch_event_tabs = ['home', 'shops', 'activitys']
		window.current_tab_name = item.name
		if (need_dispatch_event_tabs.indexOf(item.name) !== -1) {
			document.dispatchEvent(new CustomEvent(item.name, { detail: {} }))
		}
	}

	// 点击TAB栏标签
	onClickItem (index, item) {
		if (typeof item.link != 'undefined') return window.location.href = item.link // 如果有外链
		document.title = item.title ? item.title : item.label // 更改浏览器标题
		this.dispatchCustomEvent(item) // 发送自定义事件, 其他导航栏中监听
		$(window).scrollTop(0) // 切换Tab时,先将窗口的滚动距离设置为0

		// 更新地址栏参数
		Utils.updateBrowserUrl([{
			key: 'module',
			value: item.name
		}])

		Utils.delQueStr(window.location.href, 'category_id') // 这里添加一个去除category_id的方法

		// 情况category_id
		// Utils.updateBrowserUrl([{
		// 	key: 'category_id',
		// 	value: ''
		// }])

		this.setState({
			current_index: index
		})
	}

	// 获取购物车数字角标
	fetchCartTabCount () {
		this.setState({ cart_count: `99+` })
	}

	// 根据url中的module参数 获取默认的TAB的索引
	getDefaultTabIndex () {
		let module_name = Utils.getUrlParam('module')
		let found_index = 0

		// 遍历所有的TAB设置，找到对应tab的index
		this.props.data.map((item, index) => {
			if (item.name == module_name) {
				found_index = index
				document.title = item.title ? item.title : item.label //更新窗口标题
			}
		})
		return found_index
	}

	// 渲染Tab栏项
	renderItems () {
		return this.props.data.map((item, index) => {
			let className = `ui-tabbar-item ${this.state.current_index === index ? 'active' : ''}`
			let TAB_BADGE = ''

			// 购物车的数字角标
			if (this.state.cart_count && item.name === 'cart') TAB_BADGE = <span className='ui-tabbar-badge'>{this.state.cart_count}</span>

			return (
				<div key={index} className={className} onClick={this.onClickItem.bind(this, index, item)}>
					<span className='ui-tabbar-item-icon'>
						<div className={`iconfont ${item.icon}`}></div>
						{TAB_BADGE}
					</span>
					<p className='ui-tabbar-label'>{item.label}</p>
				</div>
			)
		})
	}

	// 渲染tab内容
	renderTabBarContents () {
		return this.props.data.map((item, index) => {
			let style = { display: this.state.current_index === index ? '' : 'none' }
			return <div key={index} className='ui-tabbar-content' style={style}>{item.component}</div>
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
