import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Home, Admin } from './components';
import { AuthProvider as Protected, LayoutProvider } from './Providers';

function App(): JSX.Element {
	return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Auth} />
				<Route exact path='/register' component={Auth} />
				<Protected exact path='/admin' admin>
					<LayoutProvider>
						<Admin />
					</LayoutProvider>
				</Protected>
				<Protected exact path='/'>
					<LayoutProvider>
						<Home />
					</LayoutProvider>
				</Protected>
			</Switch>
		</Router>
	);
}

export default App;
