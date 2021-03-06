import React from 'react';
import PostPage from './pages/PostsPage/PostsPage.component';
import CreatePostForm from './components/CreatePostForm/CreatePostForm.component';
import Post from './components/Post/Post.component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	a {
		color: white;
		text-decoration: none;
	}
	a:hover {
		color: white;
		text-decoration: none;
	}
	.btn {
		border-radius: 20px;
	}
	label {
		margin-top: 5px;
		font-weight: bold;
	}
	
	.btn-warning {
		color: white;
	}

	.btn-warning:hover {
		color: white;
	}

	.btn-warning:focus {
		color: white;
	}
	
	.btn-warning:active {
		color: white;
	}

	.btn-light {
		border-radius: 50%;
	}
	.btn-primary {
		border: 1px solid #61C791;
		background-color: #61C791;
	}
	.btn-primary:hover {
		background-color: #3fae72;
		border: 1px solid #3fae72;
	}
	.btn-primary:active {
		background-color: #3fae72 !important;
		border: 1px solid #3fae72 !important;
	}
	.btn-primary:focus {
		background-color: #3fae72 !important;
		border: 1px solid #3fae72 !important;
	}

`;

function App() {
	return (
		<div className='App'>
			<GlobalStyle />
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
