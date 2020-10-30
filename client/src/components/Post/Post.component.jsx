import React from 'react';
import { useHistory } from 'react-router-dom';
import CreatePostForm from '../CreatePostForm/CreatePostForm.component';
import { useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import GetAppIcon from '@material-ui/icons/GetApp';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';

const Post = () => {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [post, setPost] = React.useState('');
	const [isLoaded, setIsLoaded] = React.useState(false);
	const history = useHistory();
	const { id } = useParams();

	const handleDeleteRequest = async id => {
		const url = `/posts/${id}`;
		await axios.delete(url);
		history.push('/');
	};

	const getPost = () => {
		axios
			.get(`/posts/${id}`)
			.then(results => {
				setPost(results.data);
				setIsLoaded(true);
			})
			.catch(err => console.log(err));
	};

	React.useEffect(() => {
		setIsLoaded(false);
		getPost();
	}, [isUpdating]);

	return (
		<>
			{isUpdating ? (
				<CreatePostForm
					isUpdating={isUpdating}
					post={post}
					setIsUpdating={setIsUpdating}
					setPost={setPost}
					setIsLoaded={setIsLoaded}
				/>
			) : isLoaded ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
						backgroundColor: ' #61c791',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '2em',
							borderRadius: '15px',
							backgroundColor: 'white',
						}}
					>
						<div
							style={{
								backgroundColor: ' #61c791',
								height: '480px',
								width: '350px',
								margin: '0 50px 0 0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: '5px',
								boxShadow: '-1px 3px 17px -8px rgba(0, 0, 0, 1)',
							}}
						>
							<img
								src={post.imagePath}
								height='470'
								width='340'
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
								<strong>Date Published: </strong> {post.datePublished}
							</p>
							<p>
								<strong>Category: </strong> {post.category}
							</p>
								<p>
									<strong>Upload Date: </strong> {post.uploadDate}
							</p>
							<p>
								<strong>Downloads: </strong> {post.downloads}
							</p>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<button
									className='btn btn-info btn-sm'
								>
									<a target='_blank' href={post.filePath} download>
										<span
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<GetAppIcon />
											<h6 style={{ margin: 0, paddingBottom: '2.5px' }}>
												Download
											</h6>
										</span>
									</a>
								</button>
								<button
									className='btn btn-warning btn-sm'
									onClick={() => {
										setIsUpdating(true);
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<UpdateIcon />
										<h6 style={{ margin: 0, paddingBottom: '2.5px' }}>
											Update
										</h6>
									</div>
								</button>
								<button
									className='btn btn-danger btn-sm'
									onClick={() => {
										handleDeleteRequest(post._id);
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<DeleteIcon />
										<h6 style={{ margin: 0, paddingBottom: '2.5px' }}>
											Delete
										</h6>
									</div>
								</button>
								<button
									className='btn btn-primary btn-sm'
									onClick={() => {
										window.open(post.filePath);
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<VisibilityIcon />
										<h6 style={{ margin: 0, paddingBottom: '2.5px' }}>
											Preview
										</h6>
									</div>
								</button>
								<button
									className='btn btn-secondary btn-sm'
									onClick={() => {
										setPost('');
										history.push('/');
									}}
									style={{
										position: 'relative',
										bottom: '480px',
										left: '50px',
										height: '50px',
										width: '50px',
										borderRadius: '50%',
									}}
								>
									<CloseIcon />
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div
					style={{
						height: '100vh',
						width: '100vw',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ContentLoader
						speed={2}
						width={1000}
						height={500}
						viewBox='0 0 1000 500'
						backgroundColor='#f3f3f3'
						foregroundColor='#ecebeb'
						style={{
							position: 'relative',
							left: '150px',
						}}
					>
						<rect x='24' y='50' rx='0' ry='0' width='300' height='480' />
						<rect x='355' y='51' rx='0' ry='0' width='297' height='87' />
						<rect x='357' y='164' rx='0' ry='0' width='221' height='48' />
						<rect x='360' y='356' rx='0' ry='0' width='122' height='25' />
						<rect x='360' y='391' rx='0' ry='0' width='124' height='24' />
						<rect x='357' y='235' rx='0' ry='0' width='285' height='90' />
						<rect x='359' y='432' rx='0' ry='0' width='269' height='65' />
						<rect x='471' y='473' rx='0' ry='0' width='5' height='1' />
					</ContentLoader>
				</div>
			)}
		</>
	);
};

export default Post;
