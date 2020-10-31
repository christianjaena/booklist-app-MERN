const Post = require('../Models/PostModel');
const fs = require('fs');

const get_posts = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(400).json(err.message);
		});
};

const get_post = (req, res) => {
	const postID = req.params.id;
	Post.findById(postID)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(400).json(err.message);
		});
};

const add_post = (req, res) => {
	const { title, author, snippet, pages, datePublished, category, uploadDate, dateInput } = req.body;
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
		datePublished,
		imagePath: `/uploads/${imageName}`,
		filePath: `/uploads/${fileName}`,
		category,
		downloads: 0,
		uploadDate,
		dateInput
	};

	const post = new Post(inputModel);

	post
		.save()
		.then(result => {
			if (process.env.NODE_ENV === 'production') {
				try {
					!fs.existsSync('./client/build/uploads') &&
						fs.mkdirSync('./client/build/upload');
					image.mv(`./client/build/uploads/${imageName}`);
					file.mv(`./client/build/uploads/${fileName}`);
				} catch (err) {
					console.log(err);
				}
			} else {
				try {
					!fs.existsSync('./client/public/uploads') &&
						fs.mkdirSync('./client/public/uploads');
					image.mv(`./client/public/uploads/${imageName}`);
					file.mv(`./client/public/uploads/${fileName}`);
				} catch (err) {
					console.log(err);
				}
			}
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(400).json(err.message);
		});
};

const update_post = (req, res) => {
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

	Post.findByIdAndUpdate(id, inputModel)
		.then(result => {
			if (process.env.NODE_ENV === 'production') {
				try {
					fs.unlinkSync(`./client/build${prevFilePath}`);
					fs.unlinkSync(`./client/build${prevImagePath}`);
					image.mv(`./client/build/uploads/${imageName}`);
					file.mv(`./client/build/uploads/${fileName}`);
				} catch (err) {
					console.log(err);
				}
			} else {
				try {
					fs.unlinkSync(`./client/public${prevFilePath}`);
					fs.unlinkSync(`./client/public${prevImagePath}`);
					image.mv(`./client/public/uploads/${imageName}`);
					file.mv(`./client/public/uploads/${fileName}`);
				} catch (err) {
					console.log(err);
				}
			}
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(400).json(err);
		});
};

const delete_post = (req, res) => {
	const postID = req.params.id;

	Post.findById(postID).then(response => {
		const prevImagePath = response.imagePath;
		const prevFilePath = response.filePath;
		Post.findByIdAndDelete(postID)
			.then(result => {
				if (process.env.NODE_ENV === 'production') {
					fs.unlinkSync(`./client/build${prevFilePath}`);
					fs.unlinkSync(`./client/build${prevImagePath}`);
				} else {
					fs.unlinkSync(`./client/public${prevFilePath}`);
					fs.unlinkSync(`./client/public${prevImagePath}`);
				}
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err.message);
			});
	});
};

const delete_posts = (req, res) => {
	Post.deleteMany()
		.then(result => {
			if (process.env.NODE_ENV === 'production') {
				try {
					fs.rmdirSync('./client/build/uploads', { recursive: true });
				} catch (err) {
					console.log(err);
				}
			} else {
				try {
					fs.rmdirSync('./client/public/uploads', { recursive: true });
				} catch (err) {
					console.log(err);
				}
			}
			res.status(200).json(result);
		})
		.catch(err => {
			res.status(400).json(err);
		});
};

const download_post = (req, res) => {
	Post.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }).catch(err =>
		console.log(err)
	);
};

module.exports = {
	get_post,
	get_posts,
	add_post,
	update_post,
	delete_post,
	delete_posts,
	download_post,
};
