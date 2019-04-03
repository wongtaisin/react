import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	// Link,
	// Redirect,
	Switch
} from 'react-router-dom'

// import { RouteTransition, withTransition } from 'react-router-transition';

import Pages from './pages/'

export default (
	<Router>
		<div>
			<Switch>
				<Route exact='exact' path='/home' component={Pages.Home} />
			</Switch>
		</div>
	</Router>
)
