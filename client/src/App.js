import React from 'react';
import PostPage from './pages/PostsPage/PostsPage.component';
import CreatePostForm from './components/CreatePostForm/CreatePostForm.component';
import Post from './components/Post/Post.component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={PostPage} />
					<Route exact path='/upload' component={CreatePostForm} />
					<Route exact path='/posts/:id' component={Post} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
