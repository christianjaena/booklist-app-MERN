import React from 'react';
import axios from 'axios';
import Post from '../Post/Post.component';
import {
	StyledButton,
	PostWrapper,
	ImageWrapper,
} from './Posts.styledcomponents';

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
