import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Post = ({ post, setPostClick, setPost }) => {
	const history = useHistory();

	const handleDelete = async id => {
		const url = `/posts/${id}`;
		await axios.delete(url).then(results => console.log(results));
		history.push('/');
	};

	return (
		<>
			<button
				onClick={() => {
					setPostClick(false);
					setPost('');
					history.push('/');
				}}
			>
				Back
			</button>
			<img src={post.data?.imagePath} height='100' width='100' alt='postPic' />
			<h1>{post.data?.title}</h1>
			<h2>{post.data?.body}</h2>
			<h3>{post.data?.snippet}</h3>
			<a target='_blank' href={post.data?.filePath} download>
				Download
			</a>
			<button onClick={() => handleDelete(post.data?._id)}>Delete</button>
		</>
	);
};

export default Post;
