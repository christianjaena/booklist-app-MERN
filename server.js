const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const mongoDBURI = require('./mongoDBConnection');
const Post = require('./server/Models/PostModel');
const fileUpload = require('express-fileupload');
const path = require('path');

mongoose
	.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => {
		console.log('MongoDB Connected');

		app.listen(PORT, () => {
			console.log(`Server listening at port ${PORT}`);
		});
	})
	.catch(err => console.log(err));

app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/posts', async (req, res) => {
	Post.find().then(result => res.json(result));
});

app.get('/posts:postId', async (req, res) => {});

app.post('/upload', async (req, res) => {
	const { title, snippet, body } = req.body;
	const { file, image } = req.files;

	const inputModel = {
		title,
		snippet,
		body,
		imagePath: `/uploads/${image.name}`,
		filePath: `/uploads/${file.name}`,
	};
	const post = new Post(inputModel);
	post
		.save()
		.then(result => {
			file.mv(`${__dirname}/client/public/uploads/${file.name}`);
			image.mv(`${__dirname}/client/public/uploads/${image.name}`);
			res.status(200).json(result);
		})
		.catch(err => console.log(err));
});

app.put('/posts:postId', async (req, res) => {});

app.delete('/posts', async (req, res) => {});
