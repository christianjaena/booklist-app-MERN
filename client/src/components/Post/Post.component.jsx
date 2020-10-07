import React from 'react';
import { useHistory } from 'react-router-dom';

const Post = ({ post, setPostClick, setPost, handleDeleteRequest }) => {
	const history = useHistory();
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
			<button
				onClick={() => {
					handleDeleteRequest(post.data?._id);
					history.push('/');
				}}
			>
				Delete
			</button>
		</>
	);
};

export default Post;
