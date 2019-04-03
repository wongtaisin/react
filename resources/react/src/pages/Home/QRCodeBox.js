import React from 'react'

export default class QRCodeBox extends React.Component {
	render () {
		return (
			<section className='ui-qrcode-box'>
				<img className='qrcode-image' data-original='http://b.xizi.com/static/wap/images/hui-qr.png' alt='' />
				<div className='qrcode-text'>
					长按二维码<br />
					关注惠州
				</div>
				<div className='qrcode-slogan'>
					限量特惠  ·  跟踪订单  ·  优质服务
				</div>
			</section>
		)
	}
}
