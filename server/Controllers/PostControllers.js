const Post = require('../Models/PostModel');
const {
	createFolder,
	deleteFolder,
	deleteFolders,
	getFileNames
} = require('./PostControllers.utils');
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

	const { imageName, fileName } = getFileNames(image, file);

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

	const date = new Date();
	const fullDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}-${date.getTime()}`;
	let filePath = '';
	let imagePath = '';
	let fileName = '';
	let imageName = '';
	let isThereNewImage = false;
	let isThereNewFile = false;
	if (req.files) {
		if (req.files.file) {
			fileName = `${fullDate}-${req.files.file.name}`;
			filePath = `/uploads/${fileName}`;
			isThereNewFile = true;
		} else {
			filePath = req.body.file;
		}
		if (req.files.image) {
			imageName = `${fullDate}-${req.files.image.name}`;
			imagePath = `/uploads/${imageName}`;
			isThereNewImage = true;
		} else {
			imagePath = req.body.image;
		}
	} else {
		filePath = req.body.file;
		imagePath = req.body.image;
	}

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
				deleteFolder(prevFilePath, prevImagePath);
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
			deleteFolders();
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
