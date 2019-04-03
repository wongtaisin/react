import React from 'react'
import PageHome from './PageHome' //首页
import PageShopList from '../ShopList/' //商铺列表页面
import Activity from '../Activity/' //活动
import User from '../User/' //个人中心

import TabBar from './TabBar'

const TABS_CONFIG = [
	{ label: '首页', title: '首页', icon: 'icon-shouye', name: 'home', component: <PageHome /> },
	{ label: '商家', title: '商家', icon: 'icon-shangjia', name: 'shops', component: <PageShopList /> },
	{ label: '活动', title: '活动', icon: 'icon-huodong', name: 'activitys', component: <Activity /> },
	{ label: '购物车', icon: 'icon-gouwuche', link: '/wap/cart/cart-lists', name: 'cart', component: <PageHome /> },
	{ label: '我的', title: '个人中心', icon: 'icon-wode', name: 'user', component: <User /> }
]

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<TabBar data={TABS_CONFIG} />
			</div>
		)
	}
}
