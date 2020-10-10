import React from 'react';
import { SidebarWrapper, SideBarContent } from './Sidebar.styledcomponents';

const Sidebar = () => {
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
			</SideBarContent>
		</SidebarWrapper>
	);
};

export default Sidebar;
