let path = require('path');
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// setup view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(
	keys.mongodb.dbURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to mongodb');
	}
);

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
	res.render('home');
});

app.use('/static', express.static(path.join(__dirname, 'assets')));

app.listen(3000, () => {
	console.log('App listening on port 3000');
});
