import React from 'react';
import { useHistory } from 'react-router-dom';
import CreatePostForm from '../CreatePostForm/CreatePostForm.component';
import { useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import GetAppIcon from '@material-ui/icons/GetApp';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
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

	const downloadPostHandler = async () => {
		const url = `/posts/download/${id}`;
		await axios.put(url);
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
						flexDirection: 'column',
						justifyContent: 'center',
						marginBottom: '20px',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '2em',
							borderRadius: '15px',
						}}
					>
						<div
							style={{
								backgroundColor: '#61C791',
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
								loading='lazy'
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
							<h4>
								<em>{post.author}</em>
							</h4>
							<p>
								<strong>PAGES: </strong> {post.pages}
							</p>
							<p>
								<strong>DATE PUBLISHED: </strong> {post.datePublished}
							</p>
							<p>
								<strong>CATEGORY: </strong> {post.category}
							</p>
							<p>
								<strong>UPLOAD DATE: </strong> {post.uploadDate}
							</p>
							<p>
								<strong>DOWNLOADS: </strong> {post.downloads}
							</p>
						</div>
					</div>
					<div
						style={{
							width: '878px',
							wordBreak: 'break-all',
							borderLeft: '8px solid #61C791',
							padding: '15px',
							marginBottom: '15px',
							backgroundColor: 'rgba(0,0,0,0.05)',
						}}
					>
						{post.snippet ? (
							<p style={{ textIndent: '5em' }}>{post?.snippet}</p>
						) : (
							<h3>No description given.</h3>
						)}
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '650px',
							marginTop: '10px',
						}}
					>
						<button
							className='btn btn-info btn-lg'
							style={{ width: '150px' }}
							onClick={downloadPostHandler}
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
									<h6 style={{ margin: 0, padding: '3px 5px' }}>DOWNLOAD</h6>
								</span>
							</a>
						</button>
						<button
							className='btn btn-warning btn-lg'
							style={{ width: '150px' }}
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
								<h6 style={{ margin: 0, padding: '3px 5px' }}>UPDATE</h6>
							</div>
						</button>
						<button
							className='btn btn-danger btn-lg'
							onClick={() => {
								handleDeleteRequest(post._id);
							}}
							style={{ width: '150px' }}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<DeleteIcon />
								<h6 style={{ margin: 0, padding: '3px 5px' }}>DELETE</h6>
							</div>
						</button>
						<button
							className='btn btn-primary btn-lg'
							onClick={() => {
								window.open(post.filePath);
							}}
							style={{ width: '150px' }}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<VisibilityIcon />
								<h6 style={{ margin: 0, padding: '3px 5px' }}>PREVIEW</h6>
							</div>
						</button>
						<KeyboardBackspaceIcon
							onClick={() => {
								setPost('');
								history.push('/');
							}}
							style={{
								position: 'absolute',
								top: '25px',
								left: '30px',
								height: '50px',
								width: '50px',
								color: 'rgba(0,0,0,0.8)',
							}}
						/>
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
