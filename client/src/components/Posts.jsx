import React from 'react';
import axios from 'axios';
import Post from './Post';

const Posts = ({ posts }) => {
	const [post, setPost] = React.useState('');
	const [postClick, setPostClick] = React.useState(false);

	const handleGetPost = async id => {
		const url = `posts/${id}`;
		await axios.get(url).then(results => setPost(results));
	};


	return (
		<>
			{postClick ? (
				<Post post={post} setPostClick={setPostClick} setPost={setPost} />
			) : (
				posts.map(post => (
					<div key={post._id}>
						<h1
							onClick={() => {
								handleGetPost(post._id);
								setPostClick(true);
							}}
						>
							{post.title}
						</h1>
						<img src={post.imagePath} alt='cover' height='100' width='100' />
					</div>
				))
			)}
		</>
	);
};

export default Posts;
