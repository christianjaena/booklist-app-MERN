const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		snippet: {
			type: String,
			required: true,
		},
		pages: {
			type: Number,
			required: true,
		},
		yearPublished: {
			type: Number,
			required: true,
		},
		imagePath: {
			type: String,
			required: true,
		},
		filePath: {
			type: String,
			required: true,
		},
		downloads: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Post = Model('Post', postSchema);
module.exports = Post;
