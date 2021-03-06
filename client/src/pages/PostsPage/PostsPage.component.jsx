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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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

	const filterByCategory = e => {
		if (e.target.value !== '') {
			const sortedPosts = data.filter(post => {
				return post.category.toLowerCase() === e.target.value.toLowerCase();
			});
			setPosts(sortedPosts);
		} else {
			setPosts(data);
		}
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
						padding: '0 20px 0 15px',
					}}
				>
					<Sidebar
						posts={posts}
						onChangeHandler={onChangeHandler}
						filterByCategory={filterByCategory}
					/>
				</div>
				<div style={{ overflowY: 'auto' }}>
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
						{posts?.length === 0 ? (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'absolute',
									top: '30%',
									left: '55%',
								}}
							>
								<LibraryBooksIcon
									style={{
										height: '10em',
										width: '10em',
										color: 'rgba(0,0,0,0.2)',
									}}
								/>
								<h4 style={{ color: 'rgba(0,0,0,0.6)' }}>Nothing here.</h4>
								<h4 style={{ color: 'rgba(0,0,0,0.6)' }}>Care to share?</h4>
							</div>
						) : (
							<ReactQueryCacheProvider queryCache={queryCache}>
								<Posts posts={posts} status={status} />
							</ReactQueryCacheProvider>
						)}
					</PostsWrapper>
				</div>
			</PostPageWrapper>
		</>
	);
};

export default PostPage;
