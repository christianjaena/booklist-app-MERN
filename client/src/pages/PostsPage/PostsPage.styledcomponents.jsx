import styled from 'styled-components';

export const PostPageWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	height: 100vh;
`;

export const PostsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-row-gap: 2em;
	margin: 10px;
`;

export const CreatePostButton = styled.div`
	height: 50px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	-webkit-box-shadow: 0px 7px 24px -12px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 0px 7px 24px -12px rgba(0, 0, 0, 0.75);
	box-shadow: 0px 7px 24px -12px rgba(0, 0, 0, 0.75);
	cursor: pointer;
	margin-bottom: 5px;
`;

export const CreatePostButtonWrapper = styled.div`
	position: fixed;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-right: 2em;
	margin-bottom: 1em;
`;
