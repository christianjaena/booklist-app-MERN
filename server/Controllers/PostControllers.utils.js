const fs = require('fs');

const createFolder = (image, file, imageName, fileName) => {
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
};

const deleteFolder = (prevFilePath, prevImagePath) => {
	if (process.env.NODE_ENV === 'production') {
		fs.unlinkSync(`./client/build${prevFilePath}`);
		fs.unlinkSync(`./client/build${prevImagePath}`);
	} else {
		fs.unlinkSync(`./client/public${prevFilePath}`);
		fs.unlinkSync(`./client/public${prevImagePath}`);
	}
};

const deleteFolders = () => {
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
};

const getFileNames = (image, file) => {
	const date = new Date();
	const fullDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}-${date.getTime()}`;
	const imageName = `${fullDate}-${image.name}`;
	const fileName = `${fullDate}-${file.name}`;
	return { imageName, fileName };
};

const updateFolders = (
	isThereNewFile,
	isThereNewImage,
	fileName,
	imageName,
	req,
	prevFilePath,
	prevImagePath
) => {
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
			return {
				isThereNewFile,
				isThereNewImage,
			};
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
			return {
				isThereNewFile,
				isThereNewImage,
			};
		} catch (err) {
			console.log(err);
		}
	}
};

const getFileDetails = (req, isThereNewFile, isThereNewImage) => {
	const date = new Date();
	const fullDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}-${date.getTime()}`;
	let filePath = '';
	let imagePath = '';
	let fileName = '';
	let imageName = '';
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
	return {
		filePath,
		imagePath,
		fileName,
		imageName,
		isThereNewFile,
		isThereNewImage,
	};
};

module.exports = {
	createFolder,
	deleteFolder,
	deleteFolders,
	getFileNames,
	updateFolders,
	getFileDetails,
};
