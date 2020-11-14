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

const updateFiles = req => {
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
	return {
		filePath,
		imagePath,
		fileName,
		imageName,
		isThereNewFile,
		isThereNewImage
	};
};
module.exports = {
	createFolder,
	updateFiles
};
