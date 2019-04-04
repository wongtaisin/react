import React from 'react'
import Utils from '../../Utils'

// 因为编译时会出错，所以加上这个定义 TODO:更改ESLint配置来解决这个问题 2017-10-16
const $ = window.jQuery
const Swiper = window.Swiper

// 首页顶部导航条
export default class NavigationBar extends React.Component {

	constructor(props) {
		super(props)

		let category_id = Utils.getUrlParam('category_id') || 0 // 获取地址栏中的category_id参数
		let default_index = this.getTabIndexByCategoryId(this.props.data, category_id) // 通过category_id获取当前频道的index

		this.state = {
			current_index: default_index || 0, // 设置默认的tab索引，按地址栏参数默认选中
			current_category_id: category_id // 默认的分类ID
		}

		this.initNavigationBar = this.initNavigationBar.bind(this)
	}

	// 通过category_id获取当前顶部Tab的Index
	getTabIndexByCategoryId (category_array, category_id) {
		let found_index = 0

		// 遍历所有分类, 找到 category_id 在数组中的index
		category_array.map((item, index) => {
			if (item.id == category_id) {
				found_index = index
			}
		})
		return found_index
	}

	// 点击导航内容
	onClickFilterBarItem (index, id, label) {
		// 更新URL参数
		Utils.updateBrowserUrl([{ key: 'category_id', value: id }])
		this.setState({
			current_index: index
		})

		// 更新页面标题
		if (index == 0) document.title = `惠州商家`
		else document.title = label ? `${label} - 惠州商家` : `惠州商家`

		// if(typeof this.props.onClickFilterBarItem === 'function'){
		//     this.props.onClickFilterBarItem(index)
		// }

		$.get(`/wap/react/shop-list?category_id=${id}`, (res) => {
			if (res.code == 0) {
				this.props.onChildClick(res.data)
				window.current_navigation_id = id
				window.current_navigation_page = 2
			}
		})
	}

	componentDidMount () {
		this.initNavigationBar()
	}

	// 初始化Tab栏
	initNavigationBar () {
		let { current_index, current_category_id } = this.state // 初始化默认Tab
		if (current_index != 0) this.onClickFilterBarItem(current_index, current_category_id, this.props.data[current_index].name) // 如果默认不是第一个tab，则触发点击tab的事件方法来切换到指定的tab

		// 初始化TAB栏滑动
		this.swiper_navigation = new Swiper('.js-swiper-navigation-shops', {
			speed: 400,
			// freeMode: true,
			slidesPerView: 7
			// slidesPerColumn
		})

		// 点击底部TAB切换的时候，更新swiper
		document.addEventListener('shops', () => {
			setTimeout(() => {
				typeof this.swiper_navigation.update == 'function' && this.swiper_navigation.update()
			}, 500)
		})
	}

	render () {
		let items = this.props.data.map((item, index) => {
			let className = `ui-navigation-bar-item swiper-slide ${index === this.state.current_index ? 'active' : ''}`
			return <li onClick={this.onClickFilterBarItem.bind(this, index, `${item.id}`, item.name)} className={className} key={index}>
				<span className='label'>{item.name}</span>
			</li>
		})

		return (
			<section className='swiper-container-navigation js-swiper-navigation-shops'>
				<ul className='ui-navigation-bar swiper-wrapper'>{items}</ul>
			</section>
		)
	}
}
