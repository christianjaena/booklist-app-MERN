import React from 'react';
import { useHistory } from 'react-router-dom';
import CreatePostForm from '../CreatePostForm/CreatePostForm.component';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [post, setPost] = React.useState('');
	const history = useHistory();
	const { id } = useParams();

	const handleDeleteRequest = async id => {
		const url = `/posts/${id}`;
		await axios.delete(url).then(results => console.log(results));
		history.push('/');
	};

	React.useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then(results => setPost(results.data))
			.catch(err => console.log(err));
	}, [isUpdating]);

	return (
		<>
			{isUpdating ? (
				<CreatePostForm
					isUpdating={isUpdating}
					post={post}
					setIsUpdating={setIsUpdating}
					setPost={setPost}
				/>
			) : (
				<>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							height: '100vh',
						}}
					>
						<div
							style={{
								backgroundColor: 'white',
								height: '480px',
								width: '350px',
								margin: '0 100px 0 200px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '-1px 3px 17px -8px rgba(0, 0, 0, 1)',
							}}
						>
							<img
								src={post.imagePath}
								height='440'
								width='300'
								alt='postPic'
							/>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								height: '480px',
								width: '30em',
								wordWrap: 'break-word',
							}}
						>
							<h2>{post.title}</h2>
							<h4>{post.author}</h4>
							<div>
								<p>{post.snippet}</p>
							</div>
							<p>
								<strong>Pages: </strong> {post.pages}
							</p>
							<p>
								<strong>Year: </strong> {post.yearPublished}
							</p>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<button
										className='btn btn-primary'
										style={{ marginBottom: '10px' }}
									>
										<a target='_blank' href={post.filePath} download>
											Download
										</a>
									</button>
									<button
										className='btn btn-warning'
										onClick={() => {
											setIsUpdating(true);
										}}
									>
										Update
									</button>
								</div>
								<div>
									<button
										style={{ marginBottom: '10px' }}
										className='btn btn-danger'
										onClick={() => {
											handleDeleteRequest(post._id);
										}}
									>
										Delete
									</button>
									<button
										className='btn btn-danger'
										onClick={() => {
											setPost('');
											history.push('/');
										}}
									>
										Back
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Post;
