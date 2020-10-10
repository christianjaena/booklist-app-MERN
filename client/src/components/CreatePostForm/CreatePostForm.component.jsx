import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreatePostForm = ({
	isUpdating,
	id,
	setIsUpdating,
	prevFilePath,
	prevImagePath,
}) => {
	const [title, setTitle] = React.useState('');
	const [author, setAuthor] = React.useState('');
	const [snippet, setSnippet] = React.useState('');
	const [pages, setPages] = React.useState(0);
	const [yearPublished, setYearPublished] = React.useState(0);
	const [image, setImage] = React.useState(null);
	const [file, setFile] = React.useState(null);
	const history = useHistory();

	const axiosPost = async (data, config) => {
		await axios
			.post('/posts', data, config)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const axiosPut = async (data, config) => {
		await axios
			.put(`/posts/${id}`, data, config)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const submitHandler = async method => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('author', author);
		formData.append('snippet', snippet);
		formData.append('pages', pages);
		formData.append('yearPublished', yearPublished);
		formData.append('file', file);
		formData.append('image', image);
		if (isUpdating) {
			formData.append('prevFilePath', prevFilePath);
			formData.append('prevImagePath', prevImagePath);
		}
		const config = {
			onUploadProgress: progressEvent => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				console.log(percentCompleted);
			},
		};
		await method(formData, config);
	};

	return (
		<>
			<div>
				<button
					onClick={() => {
						isUpdating ? setIsUpdating(false) : history.push('/');
					}}
				>
					Back
				</button>
				<label htmlFor='title'>Title</label>
				<br />
				<input
					onChange={e => setTitle(e.target.value)}
					name='title'
					type='text'
					value={title}
				/>
				<br />
				<label htmlFor='author'>Author</label>
				<br />
				<input
					onChange={e => setAuthor(e.target.value)}
					type='text'
					name='author'
					value={author}
				/>
				<br />
				<label htmlFor='snippet'>Snippet</label>
				<br />
				<input
					onChange={e => setSnippet(e.target.value)}
					type='text'
					name='snippet'
					value={snippet}
				/>
				<br />
				<label htmlFor='pages'>Pages</label>
				<br />
				<input
					onChange={e => setPages(e.target.value)}
					type='number'
					name='snippet'
					value={pages}
				/>
				<br />
				<label htmlFor='yearPublished'>Year Published</label>
				<input
					onChange={e => setYearPublished(e.target.value)}
					type='number'
					name='yearPublished'
					value={yearPublished}
				/>
				<br />
				<label htmlFor='image'>Image</label>
				<br />
				<input
					onChange={e => setImage(e.target.files[0])}
					name='image'
					type='file'
					accept='image/*'
				/>
				<br />
				<label htmlFor='file'>File</label>
				<br />
				<input
					onChange={e => setFile(e.target.files[0])}
					name='file'
					type='file'
					accept='.pdf'
				/>
				<br />

				<button
					onClick={async () => {
						if (isUpdating) {
							await submitHandler(axiosPut);
							setIsUpdating(false);
						} else {
							await submitHandler(axiosPost);
							history.push('/');
						}
					}}
				>
					Submit
				</button>
			</div>
		</>
	);
};

export default CreatePostForm;
