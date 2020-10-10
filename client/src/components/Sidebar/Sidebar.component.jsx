import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
	height: 100%;
	display: fixed;
	top: 0;
	left: 0;
	background-color: #61c791;
	overflow-x: hidden;
`;

const SideBarContent = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
`;
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
