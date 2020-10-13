import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ReactHookForm = ({ isUpdating, post, setIsUpdating, setPost }) => {
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
			.then(res => setPost(res.data))
			.catch(err => console.log(err.message));
	};

	const onSubmitHandler = async data => {
		const { title, author, snippet, pages, yearPublished, file, image } = data;
		const config = {
			onUploadProgress: progressEvent => {
				const percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				console.log(percentCompleted);
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
			await setIsUpdating(false);
		} else {
			await axiosPost(formData, config);
		}
		history.push('/');
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmitHandler)}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					name='title'
					defaultValue={isUpdating ? post?.title : ''}
					ref={register({ required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}
				<label htmlFor='author'>Author</label>
				<input
					type='text'
					name='author'
					defaultValue={isUpdating ? post?.author : ''}
					ref={register({ required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}
				<label htmlFor='snippet'>Snippet</label>
				<input
					type='text'
					name='snippet'
					defaultValue={isUpdating ? post?.snippet : ''}
					ref={register({ required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}
				<label htmlFor='pages'>Pages</label>
				<input
					type='number'
					name='pages'
					defaultValue={isUpdating ? post?.pages : 0}
					ref={register({ required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}
				<label htmlFor='yearPublished'>Year Published</label>
				<input
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
					// defaultValue={isUpdating ? post?.filePath : ''}
					ref={register({ required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}
				<label htmlFor='image'>Image</label>
				<input
					type='file'
					accept='image/*'
					name='image'
					// defaultValue={isUpdating ? post?.imagePath : ''}
					ref={register({ required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}
				<input type='submit' />
			</form>
		</>
	);
};

export default ReactHookForm;
