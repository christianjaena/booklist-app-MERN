import React from 'react';
import axios from 'axios';

const CreatePostForm = () => {
	const [title, setTitle] = React.useState('title');
	const [snippet, setSnippet] = React.useState('snippet');
	const [body, setBody] = React.useState('body');
	const [image, setImage] = React.useState(null);
	const [file, setFile] = React.useState(null);

	const submitHandler = async () => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('snippet', snippet);
		formData.append('body', body);
		formData.append('file', file);
		formData.append('image', image);
		await axios.post('/upload', formData);
	};

	return (
		<>
			<div>
				<label htmlFor='title'>Title</label>
				<br />
				<input
					onChange={e => setTitle(e.target.value)}
					name='title'
					type='text'
					value={title}
				/>
				<br />
				<label htmlFor='snippet'>Snippet</label>
				<br/>
				<input
					onChange={e => setSnippet(e.target.value)}
					type='text'
					name='snippet'
					value={snippet}
				/>
				<br/>
				<label htmlFor='snippet'>Body</label>
				<br />
				<input
					onChange={e => setBody(e.target.value)}
					type='text'
					name='body'
					value= {body}
				/>
				<br/>
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

				<button onClick={submitHandler}>Submit</button>
			</div>
		</>
	);
};

export default CreatePostForm;
