const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const mongoDBURI = require('./mongoDBConnection');
const fileUpload = require('express-fileupload');
const path = require('path');
const PostRoutes = require('./server/Routes/PostRoutes')

mongoose
	.connect(mongoDBURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(res => {
		console.log('MongoDB Connected');

		app.listen(PORT, () => {
			console.log(`Server listening at port ${PORT}`);
		});
	})
	.catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', PostRoutes)

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
