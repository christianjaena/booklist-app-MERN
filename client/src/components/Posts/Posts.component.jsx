import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostWrapper, ImageWrapper } from './Posts.styledcomponents';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

const Posts = ({ posts, status }) => {
	const history = useHistory();
	return (
		<>
			{status === 'loading' && <SkeletonLoader />}
			{status === 'error' && <span>Error</span>}
			{status === 'success' &&
				posts?.map(post => (
					<div key={post._id}>
						<PostWrapper >
							<ImageWrapper>
								<img
									src={post.imagePath}
									alt='cover'
									height='210'
									width='150'
								/>
							</ImageWrapper>
							<div 
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<div style={{ height: '100%', overflow: 'auto' }}>
									<div>
										<h5>{post.title}</h5>
									</div>
									<div>
										<p style={{ fontStyle: 'italic' }}>{post.author}</p>
									</div>
									<div>
										<p>
											Pages:{' '}
											<strong style={{ fontWeight: '500' }}>
												{post.pages}
											</strong>
										</p>
									</div>
									<div>
										<p>
											Year:{' '}
											<strong style={{ fontWeight: '500' }}>
												{post.yearPublished}
											</strong>
										</p>
									</div>
								</div>
							</div>
						</PostWrapper>
						<button
							onClick={() => {
								history.push(`/posts/${post._id}`);
							}}
							style={{ width: '165px', marginLeft: '60px' }}
							className='btn btn-primary'
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<TurnedInIcon />
								<h6 style={{ margin: '0' }}>GET THIS BOOK</h6>
							</div>
						</button>
					</div>
				))}
		</>
	);
};

export default Posts;
