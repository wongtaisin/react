import React from 'react'

export default class UserHead extends React.Component {
	render () {
		return (
			<div className='ui-head'>
				<div className='ui-head-setup'>设置</div>
				<div className='ui-head-face'>
					<img src='http://7xs4ya.com2.z0.glb.qiniucdn.com/201708/21/Fhm-32OR3bn18OF875sfnRp8Yw02.JPG?imageView2/2/w/100/h/100' alt='' />
				</div>
				<div className='ui-head-name'>姓名</div>
			</div>
		)
	}
}
