import React from 'react'

export default class SwiperBox extends React.Component {

	componentDidMount () {
		new window.Swiper('.swiper-container')
	}

	swiperItem (item, index) {
		return <li className='swiper-slide swiper-slide-header' key={index}>
			<img src={item.image} alt='' />
		</li>
	}

	render () {
		if (!this.props.data) { return null }
		return (
			<div className={'ui-swiper'}>
				<div className='swiper-container'>
					<div className='swiper-wrapper'>
						{this.props.data.map(this.swiperItem)}
					</div>
				</div>
			</div>
		)
	}
}
