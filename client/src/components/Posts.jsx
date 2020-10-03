import React from 'react';

const Posts = ({ posts }) => {
	console.log(posts);
	return (
		<>
			{posts.map(post => (
				<div key={post._id}>
					<h1>{post.title}</h1>
					<h2>{post.snippet}</h2>
					<h3>{post.body}</h3>
					<img src={post.imagePath} alt='cover' />
					<a target="_blank" href={post.filePath} download>Download</a>
				</div>
			))}
		</>
	);
};

export default Posts;
