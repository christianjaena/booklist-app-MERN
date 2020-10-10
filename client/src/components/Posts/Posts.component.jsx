import React from 'react';
import axios from 'axios';
import Post from '../Post/Post.component';
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: #61c791;
	border-radius: 20px;
	outline: none;
	border: none;
	color: #fff;
	padding: 5px 15px;

	font-size: 12px;
`;
const PostWrapper = styled.div`
	display: flex;
	margin: 1em;
	padding: 10px;
`;

const ImageWrapper = styled.div`
	border: 10px white solid;
	height: 200px;
	margin-left: 2em;
	margin-right: 3em;
	-webkit-box-shadow: -1px 3px 17px -8px rgba(0, 0, 0, 1);
	-moz-box-shadow: -1px 3px 17px -8px rgba(0, 0, 0, 1);
	box-shadow: -1px 3px 17px -8px rgba(0, 0, 0, 1);
`;

const Posts = ({ posts, handleDeleteRequest }) => {
	const [post, setPost] = React.useState('');
	const [postClick, setPostClick] = React.useState(false);
	const handleGetPost = async id => {
		const url = `posts/${id}`;
		await axios.get(url).then(results => setPost(results));
	};

	return (
		<>
			{postClick ? (
				<Post
					post={post}
					setPostClick={setPostClick}
					setPost={setPost}
					handleDeleteRequest={handleDeleteRequest}
				/>
			) : (
				posts.map(post => (
					<PostWrapper key={post._id}>
						<ImageWrapper>
							<img src={post.imagePath} alt='cover' height='180' width='120' />
						</ImageWrapper>
						<div>
							<h3>{post.title}</h3>
							<p>{post.author}</p>
							<p>{post.snippet}</p>
							<StyledButton
								onClick={() => {
									handleGetPost(post._id);
									setPostClick(true);
								}}
							>
								GET THIS BOOK
							</StyledButton>
						</div>
					</PostWrapper>
				))
			)}
		</>
	);
};

export default Posts;
