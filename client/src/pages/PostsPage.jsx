import React from 'react';
import Posts from '../components/Posts';
import axios from 'axios';

const PostPage = () => {
	const [posts, setPosts] = React.useState([]);
	React.useEffect(() => {
		console.log(posts);
		axios
			.get('http://localhost:5000/posts')
			.then(results => setPosts(results.data));
	}, []);
	return (
		<>
			<h1>Posts Page</h1>
			<Posts posts={posts} />
		</>
	);
};

export default PostPage;
