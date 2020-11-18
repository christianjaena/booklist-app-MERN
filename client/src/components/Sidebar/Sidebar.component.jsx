import React from 'react';
import { SideBarContent } from './Sidebar.styledcomponents';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import categories from '../CreatePostForm/categories';

const Sidebar = ({ onChangeHandler, filterByCategory }) => {
	const deleteAllPostsHandler = async () => {
		const password = prompt('Input Admin Password');
		if (password === 'admin') {
			alert('Deleting All Books :(');
			await axios
				.delete('/posts')
				.then(res => console.log(res))
				.catch(err => console.log(err));
			window.location.reload();
		} else {
			alert('Wrong password!');
		}
	};
	return (
		<SideBarContent>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<LocalLibraryIcon
						style={{
							height: '50px',
							width: '50px',
							margin: '15px 5px 15px 15px',
						}}
					/>
					<h4 style={{ margin: '0' }}>SHAREPAGES</h4>
				</div>
			</div>
			<div style={{ margin: '15px' }}>
				<h1>Share & Read</h1>
				<h1>In One Place.</h1>
			</div>
			<div style={{ padding: '15px 15px 0 15px' }}>
				<label htmlFor='category'>SEARCH</label>
			</div>
			<div
				style={{
					backgroundColor: 'white',
					display: 'flex',
					margin: '0 10px 10px 10px',
					borderRadius: '5px',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				<input
					type='text'
					className='form form-control'
					onChange={onChangeHandler}
					placeholder=' Title or Author'
					style={{ outline: 'none', border: 'none', borderRadius: '5px' }}
				/>
				<SearchIcon
					style={{
						color: 'black',
						height: '40px',
						width: '40px',
						padding: '5px',
					}}
				/>
			</div>
			<div style={{ margin: '10px' }}>
				<label style={ {marginBottom: '8px'} }htmlFor='category'>FILTER BY CATEGORY</label>
				<select
					name='category'
					className='form form-control'
					onChange={filterByCategory}
				>
					<option value=''>Select Category</option>
					{categories.map(category => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			<div style={{ position: 'absolute', bottom: '10px', margin: '10px' }}>
				<button className='btn btn-danger' onClick={deleteAllPostsHandler}>
					DELETE ALL
				</button>
			</div>
		</SideBarContent>
	);
};

export default Sidebar;
