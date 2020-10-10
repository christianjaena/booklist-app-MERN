import React from 'react';
import { useHistory } from 'react-router-dom';
import CreatePostForm from '../CreatePostForm/CreatePostForm.component';
import axios from 'axios';

const Post = ({ postID, setPostClick, handleDeleteRequest }) => {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [post, setPost] = React.useState('');
	const history = useHistory();

	React.useEffect(() => {
		axios
			.get(`/posts/${postID}`)
			.then(results => setPost(results))
			.catch(err => console.log(err));
	}, []);

	return (
		<>
			{isUpdating ? (
				<CreatePostForm
					isUpdating={isUpdating}
					id={post.data?._id}
					prevFilePath={post.data?.filePath}
					prevImagePath={post.data?.imagePath}
					setIsUpdating={setIsUpdating}
				/>
			) : (
				<div>
					<button
						onClick={() => {
							setPostClick(false);
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
						onClick={async () => {
							await handleDeleteRequest(post.data?._id);
							history.push('/');
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
