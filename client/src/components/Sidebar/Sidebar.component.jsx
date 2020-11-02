import React from 'react';
import { SideBarContent } from './Sidebar.styledcomponents';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const Sidebar = ({ onChangeHandler }) => {
	const deleteAllPostsHandler = async () => {
		await axios
			.delete('/posts')
			.then(res => console.log(res))
			.catch(err => console.log(err));
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
				{/* <div style={{ display: 'flex' }}>
					<h6
						style={{
							margin: '13px',
						}}
					>
						CONTACT
					</h6>
					<h6 style={{ margin: '13px' }}>LIST</h6>
				</div> */}
			</div>
			<div style={{ margin: '15px' }}>
				<h1>Must</h1>
				<h1>Read</h1>
				<h1>Books.</h1>
			</div>
			<div
				style={{
					backgroundColor: 'white',
					display: 'flex',
					margin: '10px',
					borderRadius: '15px',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				<input
					type='text'
					className='form form-control'
					onChange={onChangeHandler}
					placeholder=' Title or Author or Category'
					style={{ outline: 'none', border: 'none', borderRadius: '15px' }}
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
			<div style={{ position: 'absolute', bottom: '10px', margin: '10px' }}>
				<button className='btn btn-danger' onClick={deleteAllPostsHandler}>
					DELETE ALL
				</button>
			</div>
		</SideBarContent>
	);
};

export default Sidebar;
