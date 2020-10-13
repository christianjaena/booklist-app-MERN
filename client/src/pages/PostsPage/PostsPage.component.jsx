import React from 'react';
import Posts from '../../components/Posts/Posts.component';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import {
	PostPageWrapper,
	PostsWrapper,
	CreatePostButton,
	CreatePostButtonWrapper,
} from './PostsPage.styledcomponents';

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
					<CreatePostButtonWrapper>
						<CreatePostButton onClick={() => history.push('/upload')}>
							+
						</CreatePostButton>
						<p>ADD A BOOK</p>
					</CreatePostButtonWrapper>
					<PostsWrapper>
						<Posts posts={posts} />
					</PostsWrapper>
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
