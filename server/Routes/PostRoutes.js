const express = require('express');
const route = express.Router();
const {
	get_posts,
	get_post,
	add_post,
	update_post,
	delete_post,
	delete_posts,
} = require('../Controllers/PostControllers');

route.get('/', get_posts);

route.get('/:id', get_post);

route.post('/', add_post);

route.put('/:id', update_post);

route.delete('/:id', delete_post);

route.delete('/', delete_posts);

module.exports = route;
