import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	StyledButton,
	PostWrapper,
	ImageWrapper,
} from './Posts.styledcomponents';

const Posts = ({ posts, status }) => {
	const history = useHistory();
	return (
		<>
			{status === 'loading' && <span>Loading</span>}
			{status === 'error' && <span>Error</span>}
			{status === 'success' &&
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
									history.push(`/posts/${post._id}`);
								}}
							>
								GET THIS BOOK
							</StyledButton>
						</div>
					</PostWrapper>
				))}
		</>
	);
};

export default Posts;
