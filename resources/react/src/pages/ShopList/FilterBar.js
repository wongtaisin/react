import React from 'react'

export default class FilterBar extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			current_index: 0
		}

	}

	onClickFilterBarItem () { }

	render () {
		return (
			<ul className='ui-filter-bar'>
				<li className='ui-filter-bar-item'>行业<i className='iconfont icon-xiala' /></li>
				<li className='ui-filter-bar-item'>区域</li>
				<li className='ui-filter-bar-item'>口碑</li>
			</ul>
		)
	}
}
