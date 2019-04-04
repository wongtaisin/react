import React from 'react'

export default class RecommendGrids extends React.Component {

	leftHot () {
		return this.props.data.left_datas.map((item, index) => {
			let backColor = {
				backgroundImage: `url(${item.image})`,
				backgroundRepeat: `no-repeat`,
				backgroundPosition: `center bottom`
			}
			return (
				<div className='ui-recommend-grids-item' key={index} style={backColor}></div>
			)
		})
	}

	rightHot () {
		return this.props.data.right_datas.map((item, index) => {
			let backColor = {
				backgroundImage: `url(${item.image})`,
				backgroundRepeat: `no-repeat`,
				backgroundPosition: `center right`
			}
			return (
				<div className='ui-recommend-grids-item' key={index} style={backColor}></div>
			)
		})
	}

	render () {
		return (
			<section className='ui-recommend-grids'>
				<div className='left'>
					{this.leftHot()}
				</div>
				<div className='right'>
					{this.rightHot()}
				</div>
			</section>
		)
	}
}
