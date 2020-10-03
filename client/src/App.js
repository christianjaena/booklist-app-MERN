import React from 'react';
import PostPage from './pages/PostsPage';
import './App.css'
import CreatePostPage from './pages/CreatePostPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={PostPage} />
					<Route exact path='/upload' component={CreatePostPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
