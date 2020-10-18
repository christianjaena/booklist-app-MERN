import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';

const CreatePostForm = ({ isUpdating, post, setIsUpdating, setPost }) => {
	const [progress, setProgress] = React.useState(0);
	const { register, errors, handleSubmit } = useForm();
	const history = useHistory();

	const axiosPost = async (data, config) => {
		await axios
			.post('/posts', data, config)
			.then(res => console.log(res.data))
			.catch(err => console.log(err.message));
	};

	const axiosPut = async (data, config) => {
		await axios
			.put(`/posts/${post?._id}`, data, config)
			.then(async res => {
				await setPost(res.data);
				await setIsUpdating(false);
			})
			.catch(err => console.log(err.message));
	};

	const onSubmitHandler = async data => {
		const { title, author, snippet, pages, yearPublished, file, image } = data;
		const config = {
			onUploadProgress: progressEvent => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setProgress(percentCompleted);
			},
		};
		const formData = new FormData();
		formData.append('title', title);
		formData.append('author', author);
		formData.append('snippet', snippet);
		formData.append('yearPublished', yearPublished);
		formData.append('pages', pages);
		formData.append('file', file[0]);
		formData.append('image', image[0]);
		if (isUpdating) {
			formData.append('prevFilePath', post?.filePath);
			formData.append('prevImagePath', post?.imagePath);
			await axiosPut(formData, config);
		} else {
			await axiosPost(formData, config);
			history.push('/');
		}
	};
	return (
		<>
			<LinearProgress variant='determinate' value={progress} />
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				{isUpdating ? <h1>Update Post</h1> : <h1>Create Post</h1>}
				<form
					style={{ display: 'flex', flexDirection: 'column', width: '50%' }}
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<label>Title</label>
					<input
						className='form form-control'
						type='text'
						name='title'
						defaultValue={isUpdating ? post?.title : ''}
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<label>Author</label>
					<input
						className='form form-control'
						type='text'
						name='author'
						defaultValue={isUpdating ? post?.author : ''}
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<label htmlFor='snippet'>Snippet</label>
					<textarea
						className='form form-control'
						type='text'
						name='snippet'
						maxLength='200'
						defaultValue={isUpdating ? post?.snippet : ''}
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<label htmlFor='pages'>Pages</label>
					<input
						className='form form-control'
						type='number'
						name='pages'
						defaultValue={isUpdating ? post?.pages : 0}
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<label htmlFor='yearPublished'>Year Published</label>
					<input
						className='form form-control'
						type='number'
						min='1900'
						max='2099'
						step='1'
						defaultValue={isUpdating ? post?.yearPublished : 2020}
						name='yearPublished'
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<label htmlFor='file'>File</label>
					<input
						type='file'
						accept='.pdf'
						name='file'
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<label htmlFor='image'>Image</label>
					<input
						type='file'
						accept='image/*'
						name='image'
						ref={register({ required: true })}
					/>
					{errors.exampleRequired && <span>This field is required</span>}
					<input type='submit' className='btn btn-primary' />
					<button
						className='btn btn-danger'
						onClick={() => {
							isUpdating ? setIsUpdating(false) : history.push('/');
						}}
					>
						Back
					</button>
				</form>
			</div>
		</>
	);
};

export default CreatePostForm;
