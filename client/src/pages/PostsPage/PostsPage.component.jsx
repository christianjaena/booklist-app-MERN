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
	display:grid;
	grid-template-columns: 1fr 1fr;
`

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
					<button onClick={() => history.push('/upload')}>Create Post</button>
					<PostsWrapper>
						<Posts posts={posts} handleDeleteRequest={handleDeleteRequest} />
					</PostsWrapper>
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
