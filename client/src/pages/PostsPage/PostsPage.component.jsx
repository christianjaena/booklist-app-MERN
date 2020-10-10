import React from 'react';
import Posts from '../../components/Posts/Posts.component';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar/Sidebar.component';

const PostPageWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	height: 100vh;
`;

const PostsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const CreatePostButton = styled.div`
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

const CreatePostButtonWrapper = styled.div`
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

const PostPage = () => {
	const [posts, setPosts] = React.useState([]);
	const history = useHistory();

	React.useEffect(() => {
		axios.get('/posts').then(results => setPosts(results.data));
	}, []);

	const handleDeleteRequest = async id => {
		setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
		const url = `/posts/${id}`;
		await axios.delete(url).then(results => console.log(results));
	};

	return (
		<>
			<PostPageWrapper>
				<Sidebar />
				<div style={{ backgroundColor: '#FFF' }}>
					<CreatePostButtonWrapper>
						<CreatePostButton onClick={() => history.push('/upload')}>
							+
						</CreatePostButton>
						<p>ADD A BOOK</p>
					</CreatePostButtonWrapper>
					<PostsWrapper>
						<Posts posts={posts} handleDeleteRequest={handleDeleteRequest} />
					</PostsWrapper>
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
