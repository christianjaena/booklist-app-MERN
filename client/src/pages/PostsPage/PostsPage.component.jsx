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
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const queryCache = new QueryCache();

const PostPage = () => {
	const getPosts = async () => {
		const request = await axios.get('/posts');
		return request.data;
	};
	const { data, status } = useQuery('posts', getPosts);
	const [posts, setPosts] = React.useState([]);
	const history = useHistory();

	const onChangeHandler = e => {
		const sortedPosts = data.filter(
			post =>
				post.title.toLowerCase().includes(e.target.value) ||
				post.author.toLowerCase().includes(e.target.value)
		);
		setPosts(sortedPosts);
	};

	React.useEffect(() => {
		setPosts(data);
	}, [data]);

	return (
		<>
			<PostPageWrapper>
				<div
					style={{
						display: 'sticky',
						top: '0',
						overflow: 'hidden',
						backgroundColor: '#61c791',
						padding: '0 20px 0 15px'
					}}
				>
					<Sidebar posts={posts} onChangeHandler={onChangeHandler} />
				</div>
				<div style={{ overflow: 'scroll' }}>
					<CreatePostButtonWrapper>
						<CreatePostButton
							className='btn btn-light'
							onClick={() => history.push('/upload')}
						>
							<ImportContactsIcon />
						</CreatePostButton>
						<h6>ADD A BOOK</h6>
					</CreatePostButtonWrapper>
					<PostsWrapper>
						<ReactQueryCacheProvider queryCache={queryCache}>
							<Posts posts={posts} status={status} />
						</ReactQueryCacheProvider>
					</PostsWrapper>
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
