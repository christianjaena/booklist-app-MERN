import React from 'react';
import Posts from '../components/Posts';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const PostPage = () => {
	const [posts, setPosts] = React.useState([]);
	const history = useHistory()
	React.useEffect(() => {
		console.log(posts);
		axios
			.get('/posts')
			.then(results => setPosts(results.data));
	}, []);
	return (
		<>
			<h1>Posts Page</h1>
			<button onClick={() => history.push('/upload')}>Create Post</button>
			<Posts posts={posts} />
		</>
	);
};

export default PostPage;
