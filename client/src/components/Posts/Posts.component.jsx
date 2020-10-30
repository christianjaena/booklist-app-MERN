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
						<PostWrapper>
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
									width: '80%',
								}}
							>
								<div
									style={{
										height: '100%',
										width: '100%',
										overflow: 'auto',
									}}
								>
									<h5 style={{ wordBreak: 'break-all' }}>{post.title}</h5>
									<p style={{ fontStyle: 'italic', wordBreak: 'break-all' }}>
										{post.author}
									</p>
									<p>
										Pages:{' '}
										<strong style={{ fontWeight: '500' }}>{post.pages}</strong>
									</p>
									<p>
										Category:{' '}
										<strong style={{ fontWeight: '500' }}>
											{post.category}
										</strong>
									</p>
									<p>
										Downloads:{' '}
										<strong style={{ fontWeight: '500' }}>
											{post.downloads}
										</strong>
									</p>
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
