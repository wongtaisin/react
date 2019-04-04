import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { CSSTransitionGroup } from 'react-transition-group'
// import Pages from './pages/'
import Home from './pages/Home/'
import Cashier from './pages/Cashier'

const browserHistory = createBrowserHistory({
	basename: '/'
})
const Routing = () => (
	<Router history={browserHistory}>
		<Route render={({ location, match }) => (
			<div>
				<CSSTransitionGroup transitionName='fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					<Switch key={location.key}>
						<Route exact path='/' location={location} component={Home} />
						<Route exact path='/cashier' location={location} component={Cashier} />
						{/* <Route exact path='/home' query={{ tab: 0 }} location={location} component={Pages.Home} />
						<Route exact path='/portal/:module' query={{ tab: 0 }} match={match} component={Wrapper} />
						<Route exact path='/home' query={{ tab: 1 }} location={location} component={Pages.Shop} />
						<Route exact path='/home' query={{ tab: 2 }} location={location} component={Pages.Activity} />
						<Route exact path='/home' query={{ tab: 4 }} location={location} component={Pages.User} /> */}
					</Switch>
				</CSSTransitionGroup>
			</div>
		)} />
	</Router>
)

// const Wrapper = ({ location, match }) => {
// 	return <Home location={location} match={match} />
// }

ReactDOM.render(<Routing />, document.querySelector('#root'))
