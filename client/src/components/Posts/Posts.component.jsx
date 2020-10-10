import React from 'react';
import Post from '../Post/Post.component';
import {
	StyledButton,
	PostWrapper,
	ImageWrapper,
} from './Posts.styledcomponents';

const Posts = ({ posts, handleDeleteRequest }) => {
	const [postID, setPostID] = React.useState('');
	const [postClick, setPostClick] = React.useState(false);

	return (
		<>
			{postClick ? (
				<Post
					postID={postID}
					setPostClick={setPostClick}
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
									setPostID(post._id);
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
