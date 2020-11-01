import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

const categories = [
	'Arts & Photography',
	'Biographies & Memoirs',
	'Business & Money',
	'Calendars',
	"Children's Books",
	'Christian Books & Bibles',
	'Comics & Graphic Novels',
	'Computer & Technology',
	'Cookbooks, Food & Wine',
	'Crafts, Hobbies & Home',
	'Education & Teaching',
	'Engineering & Transportation',
	'Health, Fitness & Dieting',
	'History',
	'Humor & Entertainment',
	'Law',
	'Lesbian, Gay, Bisexual & Transgender Books',
	'Literature and Fiction',
	'Medical Books',
	'Mystery, Thriller & Suspense',
	'Parenting & Social Sciences',
	'Reference',
	'Religion & Spirituality',
	'Romance',
	'Science & Math',
	'Science Fiction & Fantasy',
	'Self-Help',
	'Sports & Outdoors',
	'Teen & Young Adult',
	'Test Preparation',
	'Travel',
	'Others',
];

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
	const [image, setImage] = React.useState('');
	const [imageUpdate, setImageUpdate] = React.useState(null);
	const [file, setFile] = React.useState('');
	const [fileUpdate, setFileUpdate] = React.useState(null);

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
		const { title, author, snippet, pages, datePublished, category } = data;
		const dateInput = datePublished.split('-');
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const datePublishedFormat = `${months[dateInput[1] - 1]} ${dateInput[2]}, ${
			dateInput[0]
		}`;
		const date = new Date();
		const uploadDateFormat = `${
			months[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()}`;

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
		formData.append('dateInput', datePublished);
		formData.append('datePublished', datePublishedFormat);
		formData.append('uploadDate', uploadDateFormat);
		formData.append('pages', pages);
		data.file.length !== 0
			? formData.append('file', data.file[0])
			: formData.append('file', post?.filePath);
		data.image.length !== 0
			? formData.append('image', data.image[0])
			: formData.append('image', post?.imagePath);
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
		<>
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
							marginTop: '10px',
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
							marginTop: '10px',
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
					{errors.title && <Alert severity='warning'>Title is required!</Alert>}
					<label>Author</label>
					<input
						className='form form-control'
						type='text'
						name='author'
						maxLength='100'
						defaultValue={isUpdating ? post?.author : ''}
						ref={register({ required: true })}
					/>
					{errors.author && (
						<Alert severity='warning'>Author is required!</Alert>
					)}
					<label htmlFor='snippet'>Description</label>
					<textarea
						className='form form-control'
						type='text'
						name='snippet'
						maxLength='500'
						rows='4'
						defaultValue={isUpdating ? post?.snippet : ''}
						ref={register()}
					/>
					<label htmlFor='pages'>Pages</label>
					<input
						className='form form-control'
						type='number'
						name='pages'
						defaultValue={isUpdating ? post?.pages : 0}
						ref={register({ required: true, min: 1 })}
					/>
					{errors.pages && (
						<Alert severity='warning'>
							Pages is required and must be greater than 0!
						</Alert>
					)}
					<label htmlFor='yearPublished'>Date Published</label>
					<input
						className='form form-control'
						type='date'
						defaultValue={isUpdating ? post?.dateInput : null}
						name='datePublished'
						ref={register({ required: true })}
					/>
					{errors.datePublished && (
						<Alert severity='warning'>Date Published is required!</Alert>
					)}
					<label htmlFor='category'>Category</label>
					<select
						name='category'
						className='form form-control'
						ref={register({ required: true })}
						defaultValue={isUpdating ? post?.category : ''}
					>
						<option value=''>Select Category</option>
						{categories.map(category => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
					{errors.category && (
						<Alert severity='warning'>Category is required!</Alert>
					)}
					<label>File</label>
					<label htmlFor='file' style={{ display: 'flex' }}>
						<div
							style={{
								backgroundColor: 'white',
								height: '38px',
								width: '150px',
								padding: '5px',
								borderRadius: '5px',
								margin: '0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								border: '1px solid #ced4da',
								fontWeight: 'normal',
							}}
						>
							Choose File
						</div>
						<input
							type='text'
							value={
								isUpdating
									? fileUpdate
										? fileUpdate
										: post?.filePath.replace('/uploads/', '')
									: file
							}
							style={{
								border: '1px solid #ced4da',
								width: '80%',
								borderRadius: '5px',
							}}
							readOnly
						/>
					</label>
					<input
						id='file'
						onChange={e =>
							isUpdating
								? setFileUpdate(e.target.value.replace('C:\\fakepath\\', ''))
								: setFile(e.target.value.replace('C:\\fakepath\\', ''))
						}
						style={{
							display: 'none',
						}}
						type='file'
						accept='.pdf'
						name='file'
						ref={isUpdating ? register() : register({ required: true })}
					/>
					{errors.file && <Alert severity='warning'>File is required!</Alert>}

					<label>Image</label>
					<label htmlFor='image' style={{ display: 'flex' }}>
						<div
							style={{
								backgroundColor: '#fff',
								height: '38px',
								width: '150px',
								padding: '5px',
								borderRadius: '5px',
								margin: '0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								border: '1px solid #ced4da',
								fontWeight: 'normal',
							}}
						>
							Choose Image
						</div>
						<input
							type='text'
							value={
								isUpdating
									? imageUpdate
										? imageUpdate
										: post?.imagePath.replace('/uploads/', '')
									: image
							}
							style={ {
								width: '80%',
								border: '1px solid #ced4da',
								borderRadius: '5px'
							} }
							readOnly
						/>
					</label>
					<input
						id='image'
						onChange={e =>
							isUpdating
								? setImageUpdate(e.target.value.replace('C:\\fakepath\\', ''))
								: setImage(e.target.value.replace('C:\\fakepath\\', ''))
						}
						style={{
							overflow: 'hidden',
							backgroundColor: 'white',
							borderRadius: '5px',
							border: '1px solid#ced4da',
							display: 'none',
						}}
						type='file'
						accept='image/*'
						name='image'
						ref={isUpdating ? register() : register({ required: true })}
					/>
					{errors.image && <Alert severity='warning'>Image is required!</Alert>}
					<input
						type='submit'
						value={isUpdating ? 'UPDATE' : 'SAVE'}
						className='btn btn-info btn-lg'
						style={{
							margin: '20px 0',
						}}
					/>
				</form>
			</div>
		</>
	);
};

export default CreatePostForm;
