import {createContext} from 'react'
import { create } from '../../../server/Models/PostModel';

const PostContext = createContext({
	post: {}	
})

export default PostContext;