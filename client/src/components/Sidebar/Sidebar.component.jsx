import React from 'react';
import { SidebarWrapper, SideBarContent } from './Sidebar.styledcomponents';
import axios from 'axios';

const Sidebar = () => {
	const deleteAllPostsHandler = async () => {
		await axios
			.delete('/posts')
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	return (
		<SidebarWrapper>
			<SideBarContent>
				<span>
					<p>PAGES</p>
					<a href='#'>CONTACT</a>
					<a href='#'>LISTS</a>
				</span>
				<div>
					<h1>Startup</h1>
					<h1>Must</h1>
					<h1>Reads</h1>
					<hr />
					<input type='text' />
				</div>
				<div>
					<p>Christian Jaena</p>
				</div>
				<div>
					<button onClick={deleteAllPostsHandler}>DELETE ALL</button>
				</div>
			</SideBarContent>
		</SidebarWrapper>
	);
};

export default Sidebar;
