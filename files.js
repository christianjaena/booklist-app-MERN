const fs = require('fs')

if (!fs.existsSync('./client/public/uploads')) {
	fs.mkdir('./client/public/uploads', err => console.log(err))
}
