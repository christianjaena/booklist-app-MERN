const Post = require('../Models/PostModel');
const { createFolder, updateFiles } = require('./PostControllers.utils');
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
	const {
		title,
		author,
		snippet,
		pages,
		datePublished,
		category,
		uploadDate,
		dateInput,
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
		datePublished,
		imagePath: `/uploads/${imageName}`,
		filePath: `/uploads/${fileName}`,
		category,
		downloads: 0,
		uploadDate,
		dateInput,
	};

	const post = new Post(inputModel);

	post
		.save()
		.then(result => {
			createFolder(image, file, imageName, fileName);
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
		datePublished,
		prevFilePath,
		prevImagePath,
	} = req.body;

	const {
		filePath,
		imagePath,
		fileName,
		imageName,
		isThereNewFile,
		isThereNewImage,
	} = updateFiles(req);

	const inputModel = {
		title,
		author,
		snippet,
		pages,
		datePublished,
		imagePath,
		filePath,
	};

	Post.findByIdAndUpdate(id, inputModel)
		.then(result => {
			if (process.env.NODE_ENV === 'production') {
				try {
					if (isThereNewFile) {
						fs.unlinkSync(`./client/build${prevFilePath}`);
						req.files.file.mv(`./client/build/uploads/${fileName}`);
					}
					if (isThereNewImage) {
						fs.unlinkSync(`./client/build${prevImagePath}`);
						req.files.image.mv(`./client/build/uploads/${imageName}`);
					}
					isThereNewFile = false;
					isThereNewImage = false;
				} catch (err) {
					console.log(err);
				}
			} else {
				try {
					if (isThereNewFile) {
						fs.unlinkSync(`./client/public${prevFilePath}`);
						req.files.file.mv(`./client/public/uploads/${fileName}`);
					}
					if (isThereNewImage) {
						fs.unlinkSync(`./client/public${prevImagePath}`);
						req.files.image.mv(`./client/public/uploads/${imageName}`);
					}
					isThereNewFile = false;
					isThereNewImage = false;
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
