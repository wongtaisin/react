import React from 'react'
import Utils from '../../Utils'

// 因为编译时会出错，所以加上这个定义 TODO:更改ESLint配置来解决这个问题 2017-10-16
const $ = window.jQuery
const Swiper = window.Swiper

// 首页顶部导航条
export default class NavigationBar extends React.Component {

	constructor(props) {
		super(props)

		// 获取地址栏中的category_id参数
		let category_id = Utils.getUrlParam('category_id') || 0
		// 通过category_id获取当前频道的index
		let default_index = this.getTabIndexByCategoryId(this.props.data, category_id)

		this.state = {
			current_index: default_index || 0, // 设置默认的tab索引，按地址栏参数默认选中
			current_category_id: category_id // 默认的分类ID
		}

		this.initNavigationBar = this.initNavigationBar.bind(this)
	}

	// 过category_id获取当前顶部Tab的Index
	getTabIndexByCategoryId (category_array, category_id) {
		let found_index = 0

		// 遍历所有分类, 找到 category_id 在数组中的index
		category_array.map((item, index) => {
			if (item.category_id == category_id) found_index = index
		})
		return found_index
	}

	componentDidMount () {
		this.initNavigationBar()
	}

	// 初始化Tab栏
	initNavigationBar () {

		//初始化默认Tab
		let { current_index, current_category_id } = this.state

		//如果默认不是第一个tab，则触发点击tab的事件方法来切换到指定的tab
		if (current_index != 0) this.onClickNavigationBarItem(current_index, current_category_id)

		//初始化TAB栏滑动
		this.swiper_navigation = new Swiper('.js-swiper-navigation-home', {
			speed: 400,
			// freeMode: true,
			slidesPerView: 7
			// slidesPerColumn
		})

		document.addEventListener('home', () => {
			setTimeout(() => {
				typeof this.swiper_navigation.update == 'function' && this.swiper_navigation.update()
				//需求从其他tab切换到[首页]时, 需要将顶部的导航栏栏目切换到[推荐]
				if (this.state.current_index != 0) this.onClickNavigationBarItem(0, 0)
			}, 500)
		})
	}

	// 点击导航内容
	onClickNavigationBarItem (index, id, label) {

		// 更新URL参数
		Utils.updateBrowserUrl([{
			key: 'category_id',
			value: id
		}])

		this.setState({
			current_index: index
		})

		// 更新窗口标题
		if (typeof label != 'undefined') {
			// 如果index==0
			if (index == 0) document.title = '惠州'
			else document.title = `${label} - 惠州`
		}

		if (typeof this.props.onClickNavigationBarItem === 'function') this.props.onClickNavigationBarItem(index)

		// $.get(`/wap/react/cate-data?category_id=${id}`, (res) => {
		// 	if (res.code == 0) this.props.onChildClick(res.data)
		// })
	}

	render () {
		let items = this.props.data.map((item, index) => {
			let className = `ui-navigation-bar-item swiper-slide ${index === this.state.current_index ? 'active' : ''}`

			return <li onClick={this.onClickNavigationBarItem.bind(this, index, `${item.category_id}`, item.title)} className={className} key={index}>
				<span className='label'>{item.title}</span>
			</li>
		})

		return (
			<section className='swiper-container-navigation js-swiper-navigation-home'>
				<ul className='ui-navigation-bar swiper-wrapper'>{items}</ul>
			</section>
		)
	}
}
