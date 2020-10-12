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
			.then(results => setPost(results))
			.catch(err => console.log(err));
	}, [isUpdating]);

	return (
		<>
			{isUpdating ? (
				<CreatePostForm
					isUpdating={isUpdating}
					id={post.data?._id}
					prevFilePath={post.data?.filePath}
					prevImagePath={post.data?.imagePath}
					setIsUpdating={setIsUpdating}
					setPost={setPost}
				/>
			) : (
				<div>
					<button
						onClick={() => {
							setPost('');
							history.push('/');
						}}
					>
						Back
					</button>
					<img
						src={post.data?.imagePath}
						height='100'
						width='100'
						alt='postPic'
					/>
					<h1>{post.data?.title}</h1>
					<h2>{post.data?.author}</h2>
					<h3>{post.data?.snippet}</h3>
					<h3>{post.data?.pages}</h3>
					<h3>{post.data?.yearPublished}</h3>
					<a target='_blank' href={post.data?.filePath} download>
						Download
					</a>
					<button
						onClick={() => {
							setIsUpdating(true);
						}}
					>
						Update
					</button>
					<button
						onClick={() => {
							handleDeleteRequest(post.data?._id);
						}}
					>
						Delete
					</button>
				</div>
			)}
		</>
	);
};

export default Post;
