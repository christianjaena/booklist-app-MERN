import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.div`
	background-color: green;
`;

const Sidebar = () => {
	return (
		<>
			<SidebarWrapper>
				<h1>SideBar</h1>
			</SidebarWrapper>
		</>
	);
};

export default Sidebar;
