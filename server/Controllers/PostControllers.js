const Post = require('../Models/PostModel');
const fs = require('fs');

const uploadsFolderLocal = '../../client/public/uploads'
const uploadsFolderProd = '../../client/build/uploads'

const get_posts = async (req, res) => {
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
};

const get_post = async (req, res) => {
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
};

const add_post = async (req, res) => {
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
					if (!fs.existsSync(uploadsFolderProd)) {
						fs.mkdir(uploadsFolderProd, err => {
							if (err) {
								console.log(err.message);
							}
						});
					}
					image.mv(uploadsFolderProd + '/' + imageName);
					file.mv(uploadsFolderProd + '/' + fileName);
				} else {
					if (!fs.existsSync(uploadsFolderLocal)) {
						fs.mkdir(uploadsFolderLocal, err => {
							if (err) {
								console.log(err.message);
							}
						});
					}
					image.mv(
						`${__dirname}/${uploadsFolderLocal}/${imageName}`,
						err => console.log(err)
					);
					file.mv(`${__dirname}${uploadsFolderLocal}/${fileName}`, err =>
						console.log(err)
					);
				}
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err.message);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
};

const update_post = async (req, res) => {
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
					fs.unlink(`${uploadsFolderProd}${prevFilePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					fs.unlink(`${uploadsFolderProd}${prevImagePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					image.mv(`${uploadsFolderProd}/${imageName}`);
					file.mv(`${uploadsFolderProd}/${fileName}`);
				} else {
					fs.unlink(`${__dirname}/../../client/public${prevFilePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					fs.unlink(`${__dirname}/../../client/public${prevImagePath}`, err => {
						if (err) {
							res.status(400).json(err.message);
						}
					});
					image.mv(`${__dirname}/${uploadsFolderLocal}/${imageName}`);
					file.mv(`${__dirname}/${uploadsFolderLocal}/${fileName}`);
				}
				res.status(200).json(result);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	} catch (err) {
		res.status(400).json(err.message);
	}
};

const delete_post = async (req, res) => {
	const postID = req.params.id;

	try {
		await Post.findById(postID).then(res => {
			const prevImagePath = res.imagePath;
			const prevFilePath = res.filePath;
			if (process.env.NODE_ENV === 'production') {
				fs.unlink(`../../client/build${prevFilePath}`, err => {
					if (err) {
						res.status(400).json(err.message);
					}
				});
				fs.unlink(`../../client/build${prevImagePath}`, err => {
					if (err) {
						res.status(400).json(err.message);
					}
				});
			} else {
				fs.unlink(`${__dirname}/../../client/public${prevFilePath}`, err => {
					if (err) {
						console.log(err.message);
					}
				});
				fs.unlink(`${__dirname}/../../client/public${prevImagePath}`, err => {
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
};

const delete_posts = async (req, res) => {
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
				fs.rmdirSync(uploadsFolderProd, { recursive: true });
				fs.mkdir(uploadsFolderProd, err => console.log(err.message));
			} catch (err) {
				res.status(400).json(err);
				console.log(err);
			}
		} else {
			try {
				fs.rmdirSync(uploadsFolderLocal, { recursive: true }, err => console.log(err.message));
				fs.mkdir(uploadsFolderLocal, err => console.log(err.message));
			} catch (err) {
				res.status(400).json(err);
			}
		}
	} catch (err) {
		res.json(400).json(err);
	}
};

module.exports = {
	get_post,
	get_posts,
	add_post,
	update_post,
	delete_post,
	delete_posts,
};
