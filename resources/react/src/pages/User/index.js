import React from 'react'
import UserHead from './UserHead' // 个人中心头像设置
import UserOrder from './UserOrder' // 个人中心订单
import UserList from './UserList' // 个人中心列表

export default class PageUser extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			order: [
				{
					icon: 'icon-daishiyong',
					name: '待使用'
				},
				{
					icon: 'icon-tubiaolunkuo-',
					name: '待收货'
				},
				{
					icon: 'icon-weiquanzhong',
					name: '维权中'
				},
				{
					icon: 'icon-shouhoutuikuan',
					name: '已完成'
				}
			],
			list: [
				{
					icon: 'icon-dianziquan',
					name: '电子券',
					num: 0
				},
				{
					icon: 'icon-23',
					name: '福利金',
					num: 4,
					numText: '福利兑换'
				},
				{
					icon: 'icon-dianziquan',
					name: '电子券',
					num: 0
				}
			]
		}
	}

	render () {
		let { order, list } = this.state
		return (
			<section id='page-user-list'>
				<UserHead />
				<UserOrder data={order} />
				<UserList data={list} />
			</section>
		)
	}
}
