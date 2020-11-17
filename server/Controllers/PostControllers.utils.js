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

module.exports = {
	createFolder,
	deleteFolder,
	deleteFolders,
	getFileNames
};
