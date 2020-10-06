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

const PostPage = () => {
	const [posts, setPosts] = React.useState([]);
	const history = useHistory();
	React.useEffect(() => {
		axios.get('/posts').then(results => setPosts(results.data));
	}, []);
	return (
		<>
			<PostPageWrapper>
				<Sidebar />
				<div>
					<h1>Posts Page</h1>
					<button onClick={() => history.push('/upload')}>Create Post</button>
					<Posts posts={posts} />
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
