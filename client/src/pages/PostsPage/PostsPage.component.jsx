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
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query';

const queryCache = new QueryCache();

const PostPage = () => {
	// const [posts, setPosts] = React.useState([]);
	const getPosts = async () => {
		const request = await axios.get('/posts');
		return request.data;
	};
	const {data, status} = useQuery('posts', getPosts);
	const history = useHistory();

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
						<ReactQueryCacheProvider queryCache={queryCache}>
							<Posts posts={data} status={status} />
						</ReactQueryCacheProvider>
					</PostsWrapper>
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
