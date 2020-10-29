import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CloseIcon from '@material-ui/icons/Close';

const CreatePostForm = ({
	isUpdating,
	post,
	setIsUpdating,
	setIsLoaded,
	setPost,
}) => {
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
				await setIsLoaded(true);
			})
			.catch(err => console.log(err.message));
	};

	const onSubmitHandler = async data => {
		const {
			title,
			author,
			snippet,
			pages,
			yearPublished,
			file,
			image,
			category,
		} = data;

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
		formData.append('category', category);
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
		<div>
			<div style={{ position: 'sticky', top: '0' }}>
				<LinearProgress
					variant='determinate'
					style={
						progress > 1
							? { visibility: 'visible', height: '10px' }
							: { visibility: 'hidden' }
					}
					value={progress}
				/>
			</div>
			<div
				className='container'
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					backgroundColor: '#8ddeb3',
					width: '800px',
					borderRadius: '15px',
					marginTop: '30px',
					padding: '15px',
				}}
			>
				{isUpdating ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<MenuBookIcon fontSize='large' />
						<h1 style={{ margin: '0 0 0 10px' }}>Update Book</h1>
					</div>
				) : (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '10px',
						}}
					>
						<ImportContactsIcon fontSize='large' />
						<h1 style={{ margin: '0 0 0 10px' }}>Add Book</h1>
					</div>
				)}
				<button
					className='btn btn-secondary'
					style={{
						width: '50px',
						height: '50px',
						position: 'relative',
						bottom: '90px',
						left: '400px',
						borderRadius: '50%',
					}}
					onClick={() => {
						isUpdating ? setIsUpdating(false) : history.push('/');
					}}
				>
					<CloseIcon />
				</button>
				<form
					style={{ display: 'flex', flexDirection: 'column', width: '50%' }}
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<label>Title</label>
					<input
						className='form form-control'
						type='text'
						name='title'
						maxLength='100'
						defaultValue={isUpdating ? post?.title : ''}
						ref={register({ required: true })}
					/>
					<label>Author</label>
					<input
						className='form form-control'
						type='text'
						name='author'
						maxLength='100'
						defaultValue={isUpdating ? post?.author : ''}
						ref={register({ required: true })}
					/>
					<label htmlFor='snippet'>Snippet</label>
					<textarea
						className='form form-control'
						type='text'
						name='snippet'
						maxLength='200'
						rows='4'
						defaultValue={isUpdating ? post?.snippet : ''}
						ref={register({ required: true })}
					/>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ marginRight: '15px' }}>
							<label htmlFor='pages'>Pages</label>
							<input
								className='form form-control'
								type='number'
								name='pages'
								min='1'
								defaultValue={isUpdating ? post?.pages : 1}
								ref={register({ required: true })}
							/>
						</div>
						<div style={{ width: '200px' }}>
							<label htmlFor='yearPublished'>Year Published</label>
							<input
								className='form form-control'
								type='number'
								min='1800'
								max='2020'
								step='1'
								defaultValue={isUpdating ? post?.yearPublished : 2020}
								name='yearPublished'
								ref={register({ required: true })}
							/>
						</div>
					</div>
					<label htmlFor='category'>Category</label>
					<select
						name='category'
						className='form form-control'
						ref={register({ required: true })}
					>
						<option value='Arts and Photography'>Arts and Photography</option>
						<option value='Biographies and Memoirs'>
							Biographies and Memoirs
						</option>
					</select>
					<label htmlFor='file'>File</label>
					<input
						style={{
							overflow: 'hidden',
							backgroundColor: 'white',
							borderRadius: '5px',
							border: '1px solid#ced4da',
						}}
						type='file'
						accept='.pdf'
						name='file'
						ref={register({ required: true })}
					/>
					<label htmlFor='image'>Image</label>
					<input
						style={{
							overflow: 'hidden',
							backgroundColor: 'white',
							borderRadius: '5px',
							border: '1px solid#ced4da',
						}}
						type='file'
						accept='image/*'
						name='image'
						ref={register({ required: true })}
					/>
					<input
						type='submit'
						value={isUpdating ? 'Update' : 'Save'}
						className='btn btn-info btn-lg'
						style={{
							margin: '20px 0',
						}}
					/>
				</form>
			</div>
		</div>
	);
};

export default CreatePostForm;
