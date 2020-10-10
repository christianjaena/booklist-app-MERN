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
const fs = require('fs');

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
	try {
		await Post.find()
			.sort({ createdAt: -1 })
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err.message);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
});

app.get('/posts/:id', async (req, res) => {
	const postID = req.params.id;
	try {
		await Post.findById(postID)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err.message);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
});

app.post('/posts', async (req, res) => {
	const { title, author, snippet, pages, yearPublished } = req.body;
	const { file, image } = req.files;

	const date = new Date();
	const fullDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}-${date.getTime()}`;
	const imageName = `${fullDate}-${image.name}`;
	const fileName = `${fullDate}-${file.name}`;

	const inputModel = {
		title,
		author,
		snippet,
		pages,
		yearPublished,
		imagePath: `/uploads/${imageName}`,
		filePath: `/uploads/${fileName}`,
	};

	const post = new Post(inputModel);

	try {
		await post
			.save()
			.then(result => {
				if (process.env.NODE_ENV === 'production') {
					if (!fs.existsSync('./client/build/uploads')) {
						fs.mkdir('./client/build/uploads', err => {
							if (err) {
								console.log(err.message);
							}
						});
					}
					image.mv(`client/build/uploads/${imageName}`);
					file.mv(`client/build/uploads/${fileName}`);
				} else {
					if (!fs.existsSync('./client/public/uploads')) {
						fs.mkdir('./client/public/uploads', err => {
							if (err) {
								console.log(err.message);
							}
						});
					}
					image.mv(`${__dirname}/client/public/uploads/${imageName}`);
					file.mv(`${__dirname}/client/public/uploads/${fileName}`);
				}
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err.message);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
});

app.put('/posts/:id', async (req, res) => {
	const id = req.params.id;
	const {
		title,
		author,
		snippet,
		pages,
		yearPublished,
		prevFilePath,
		prevImagePath,
	} = req.body;

	const { file, image } = req.files;

	const date = new Date();
	const fullDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}-${date.getTime()}`;
	const imageName = `${fullDate}-${image.name}`;
	const fileName = `${fullDate}-${file.name}`;

	const inputModel = {
		title,
		author,
		snippet,
		pages,
		yearPublished,
		imagePath: `/uploads/${imageName}`,
		filePath: `/uploads/${fileName}`,
	};

	try {
		await Post.findByIdAndUpdate(id, inputModel)
			.then(result => {
				if (process.env.NODE_ENV === 'production') {
					fs.unlink(`client/build${prevFilePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					fs.unlink(`client/build${prevImagePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					image.mv(`client/build/uploads/${imageName}`);
					file.mv(`client/build/uploads/${fileName}`);
				} else {
					fs.unlink(`${__dirname}/client/public${prevFilePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					fs.unlink(`${__dirname}/client/public${prevImagePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					image.mv(`${__dirname}/client/public/uploads/${imageName}`);
					file.mv(`${__dirname}/client/public/uploads/${fileName}`);
				}
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
});

app.delete('/posts/:id', async (req, res) => {
	const postID = req.params.id;

	try {
		await Post.findById(postID).then(res => {
			const prevImagePath = res.imagePath;
			const prevFilePath = res.filePath;
			if (process.env.NODE_ENV === 'production') {
				fs.unlink(`client/build${prevFilePath}`, err => {
					if (err) {
						res.status(400).json(err.message);
					}
				});
				fs.unlink(`client/build${prevImagePath}`, err => {
					if (err) {
						res.status(400).json(err.message);
					}
				});
			} else {
				fs.unlink(`${__dirname}/client/public${prevFilePath}`, err => {
					if (err) {
						console.log(err.message);
					}
				});
				fs.unlink(`${__dirname}/client/public${prevImagePath}`, err => {
					if (err) {
						console.log(err.message);
					}
				});
			}
		});
		await Post.findByIdAndDelete(postID)
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err.message);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
});

app.delete('/posts', async (req, res) => {
	try {
		await Post.deleteMany()
			.then(result => {
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err);
			});
		if (process.env.NODE_ENV === 'production') {
			try {
				fs.rmdirSync('/client/build/uploads', { recursive: true });
				fs.mkdir('./client/build/uploads', err => console.log(err.message));
			} catch (err) {
				res.status(400).json(err);
				console.log(err);
			}
		} else {
			try {
				fs.rmdirSync(`./client/public/uploads`, { recursive: true });
				fs.mkdir(`./client/public/uploads`, err => console.log(err.message));
			} catch (err) {
				res.status(400).json(err);
			}
		}
	} catch (err) {
		res.json(400).json(err);
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
