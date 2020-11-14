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

module.exports = {
	createFolder,
};
