import React from 'react'

class Spinner extends React.Component {

	render () {
		return (
			<div id='page-loading-spinner'>
				<img src='./backend/web/dist/images/index/loading.gif' />
			</div>
		)
	}
}

export default Spinner
