let path = require('path');
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const app = express();

// setup view engine
app.set('view engine', 'ejs');

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
