import React from 'react'

class RecommendCate extends React.Component {

	constructor(props) {
		super(props)
	}

	renderItem (item, index) {
		return <a href={item.url} key={`tab-${index}`} className='ui-recommend-cate-item'>
			{/* <svg className="icon" aria-hidden="true">
				<use xlinkHref={`#${item.icon}`}></use>
			</svg> */}
			<img src={item.image} />
			<span className='label'>{item.title}</span>
		</a>
	}

	render () {
		return (
			<ul className='ui-recommend-cate'>
				{this.props.data.map(this.renderItem)}
			</ul>
		)
	}
}

export default RecommendCate
