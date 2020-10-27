import React from 'react';
import {  SideBarContent } from './Sidebar.styledcomponents';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';

const Sidebar = ({ onChangeHandler }) => {
	const deleteAllPostsHandler = async () => {
		await axios
			.delete('/posts')
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	return (
		<SideBarContent>
			<div style={{ backgroundColor: 'white', display: 'flex' }}>
				<input
					type='text'
					className='form form-control'
					onChange={onChangeHandler}
				/>
				<SearchIcon style={{ color: 'black' }} />
			</div>
			<div>
				<button onClick={deleteAllPostsHandler}>DELETE ALL</button>
			</div>
		</SideBarContent>
	);
};

export default Sidebar;
