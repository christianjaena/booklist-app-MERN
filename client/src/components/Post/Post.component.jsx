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
					<div>
						<button
							onClick={() => {
								setPost('');
								history.push('/');
							}}
						>
							Back
						</button>
						<img src={post.imagePath} height='100' width='100' alt='postPic' />
						<h1>{post.title}</h1>
						<h2>{post.author}</h2>
						<h3>{post.snippet}</h3>
						<h3>{post.pages}</h3>
						<h3>{post.yearPublished}</h3>
						<a target='_blank' href={post.filePath} download>
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
								handleDeleteRequest(post._id);
							}}
						>
							Delete
						</button>
					</div>
				</>
			)}
		</>
	);
};

export default Post;
