import React from 'react'
import Spinner from '../../components/Spinner'
// import Utils from '../../Utils'

const $ = window.jQuery

// 活动列表
class ActivityList extends React.Component {

	renderActivityList () {
		return this.props.data.map((item, index) => {
			return (
				<a href={item.url} key={index}>
					<li className='ui-activity-list'>
						<div className='ui-activity-list-img'>
							<img src={item.cover_img} alt='' />
						</div>
						<div className='item-main'>
							<div className='ui-activity-list-title'>{item.title}</div>
							<div className='ui-activity-list-text'>
								<div className='ui-activity-list-time'>截止时间：{item.end_time}</div>
								<div className='ui-activity-list-block'>{item.button}</div>
							</div>
						</div>
					</li>
				</a>
			)
		})
	}

	render () {
		return (
			<ul>
				{this.renderActivityList()}
			</ul>
		)
	}
}

export default class ActivityListPage extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activity: [],
			page: 1
		}

		this.is_lastpage = false
		this.fetchActivityData = this.fetchActivityData.bind(this) //数据
		this.onScrollBottom = this.onScrollBottom.bind(this)
		this.initPage = this.initPage.bind(this)
		this.addCustomEventListener = this.addCustomEventListener.bind(this)
	}

	// 滑动加载
	onScrollBottom () {
		window.onscroll = () => {
			if (this.is_lastpage) return false
			if (window.current_tab_name !== 'activitys') return false
			if (window.innerHeight + window.scrollY + 30 >= document.body.scrollHeight) this.fetchActivityData(this.state.page)
		}
	}

	// 数据
	fetchActivityData () {
		// if (this.isLoading) return false
		// this.isLoading = true
		// $.get(`/wap/react/active-list?page=${this.state.page}`, (res) => {
		// 	this.isLoading = false
		// 	if (res.code == 0) {
		// 		if (res.data.length == 0) this.is_lastpage = true
		// 		return this.setState({
		// 			activity: [this.state.activity, ...res.data],
		// 			page: this.state.page + 1
		// 		})
		// 	}
		// })

		this.setState({
			activity: [{
				url: '',
				cover_img: 'http://img.mp.itc.cn/upload/20170718/75aa5fc46cfa430a90d5055b732066e0_th.jpg',
				title: '格子',
				end_time: '2048',
				button: '按钮'
			}, {
				url: '',
				cover_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540034823709&di=89963223993f1eceb63bd7989a82a810&imgtype=0&src=http%3A%2F%2Fi4.hexunimg.cn%2F2015-02-05%2F173116991.jpg',
				title: '格子',
				end_time: '2048',
				button: '按钮'
			}]
		})
	}

	// 初始化
	addCustomEventListener () {
		document.addEventListener("activitys", this.initPage)
	}

	// 页面初始化（获取数据、添加事件绑定）
	initPage () {
		if (this.initiated) return false
		this.fetchActivityData()
		this.onScrollBottom()
		this.initiated = true
		// var myLazyLoad = new window.LazyLoad(); // 初始化图片延时加载
	}

	componentDidMount () {
		this.initPage()
		// if (Utils.getUrlParam('module') == 'activitys') {
		// 	this.initPage()
		// } else {
		// 	this.addCustomEventListener()
		// }
	}

	render () {
		let { activity } = this.state
		if (!activity) return (<Spinner />)
		return (
			<section id='page-activity-list'>
				<ActivityList data={activity} />
			</section>
		)
	}
}