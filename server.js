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
	.connect(mongoDBURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(res => {
		console.log('MongoDB Connected');

		app.listen(PORT, () => {
			console.log(`Server listening at port ${PORT}`);
		});
	})
	.catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/posts', async (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then(result => res.json(result))
		.catch(err => console.log(err));
});

app.get('/posts/:id', async (req, res) => {
	const postID = req.params.id;
	Post.findById(postID)
		.then(result => res.json(result))
		.catch(err => console.log(result));
});

app.post('/posts', async (req, res) => {
	const { title, author, snippet, pages, yearPublished } = req.body;
	const { file, image } = req.files;

	const inputModel = {
		title,
		author,
		snippet,
		pages,
		yearPublished,
		imagePath: `/uploads/${image.name}`,
		filePath: `/uploads/${file.name}`,
	};
	const post = new Post(inputModel);
	post
		.save()
		.then(result => {
			if (process.env.NODE_ENV === 'production') {
				image.mv(`client/build/uploads/${image.name}`);
				file.mv(`client/build/uploads/${file.name}`);
			} else {
				image.mv(`${__dirname}/client/public/uploads/${image.name}`);
				file.mv(`${__dirname}/client/public/uploads/${file.name}`);
			}

			res.status(200).json(result);
		})
		.catch(err => console.log(err));
});

app.put('/posts/:id', async (req, res) => {
	const id = req.params.id;
	const { title, author, snippet, pages, yearPublished } = req.body;
	const { file, image } = req.files;

	const inputModel = {
		title,
		author,
		snippet,
		pages,
		yearPublished,
		imagePath: `/uploads/${image.name}`,
		filePath: `/uploads/${file.name}`,
	};

	await Post.findByIdAndUpdate(id, inputModel)
		.then(result => {
			if (process.env.NODE_ENV === 'production') {
				image.mv(`client/build/uploads/${image.name}`);
				file.mv(`client/build/uploads/${file.name}`);
			} else {
				image.mv(`${__dirname}/client/public/uploads/${image.name}`);
				file.mv(`${__dirname}/client/public/uploads/${file.name}`);
			}
		})
		.catch(err => console.log(err));
});

app.delete('/posts/:id', async (req, res) => {
	const postID = req.params.id;
	Post.findByIdAndDelete(postID)
		.then(result => res.json(result))
		.catch(err => console.log(err));
});

app.get('*', (req, res) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
