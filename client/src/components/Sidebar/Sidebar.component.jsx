import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
	background-color: #61c791;
`;

const Sidebar = () => {
	return (
		<>
			<SidebarWrapper>
				<span>
					<p>BOOKCLUB</p>
					<a href='#'>CONTACT</a>
					<a href='#'>LISTS</a>
				</span>
				<div>
					<h1>Startup</h1>
					<h1>Must</h1>
					<h1>Reads</h1>
					<hr/>
					<input type="text"/>
				</div>
				<div>
					<p>Christian Jaena</p>
				</div>
			</SidebarWrapper>
		</>
	);
};

export default Sidebar;
