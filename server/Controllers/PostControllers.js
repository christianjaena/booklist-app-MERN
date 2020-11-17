const Post = require('../Models/PostModel');
const {
	createFolder,
	deleteFolder,
	deleteFolders,
	getFileNames,
	getFileDetails,
	updateFolders,
} = require('./PostControllers.utils');

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

	let isThereNewImage = false;
	let isThereNewFile = false;

	({
		filePath,
		imagePath,
		fileName,
		imageName,
		isThereNewFile,
		isThereNewImage,
	} = getFileDetails(req, isThereNewFile, isThereNewImage));

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
			({ isThereNewFile, isThereNewImage } = updateFolders(
				isThereNewFile,
				isThereNewImage,
				fileName,
				imageName,
				req,
				prevFilePath,
				prevImagePath
			));
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
