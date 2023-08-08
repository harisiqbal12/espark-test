import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Home } from './components';
import { AuthProvider as Protected } from './Providers';

function App(): JSX.Element {
	return (
		<Router>
			<Switch>
				<Route exact path='/login' component={Auth} />
				<Protected exact path='/'>
					<Home />
				</Protected>
			</Switch>
		</Router>
	);
}

export default App;
