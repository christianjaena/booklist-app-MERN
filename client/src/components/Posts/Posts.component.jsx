import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostWrapper, ImageWrapper } from './Posts.styledcomponents';

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
							<img src={post.imagePath} alt='cover' height='210' width='150' />
						</ImageWrapper>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<div style={{ height: '100%' }}>
								<div>
									<h5>{post.title}</h5>
								</div>
								<div>
									<p>{post.author}</p>
								</div>
								<div>
									<p>Pages: {post.pages}</p>
								</div>
								<div>
									<p>Year: {post.yearPublished}</p>
								</div>
							</div>
							<button
								onClick={() => {
									history.push(`/posts/${post._id}`);
								}}
								style={{ width: '150px' }}
								className='btn btn-primary'
							>
								GET THIS BOOK
							</button>
						</div>
					</PostWrapper>
				))}
		</>
	);
};

export default Posts;
