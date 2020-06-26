const router = require('express').Router();
const passport = require('passport');
const memoryCache = require('../memoryCache');
const secret = require('../config/keys');

const notAuthCheck = (req, res, next) => {
	if (req.user) res.redirect('/');
	else next();
};

// auth login
router.get('/login', notAuthCheck, (req, res) => {
	res.render('login', { user: req.user });
});

//auth logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// auth with google
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile'],
	})
);

// callback route for google to redirect to
router.get(
	'/google/redirect',
	passport.authenticate('google', {
		failureRedirect: '/auth/login',
	}),
	(req, res) => {
		res.render('redirect', {
			user: req.user,
			profile: memoryCache.get('googleProfile'),
			accessToken: memoryCache.get('accessToken'),
			client_id: secret.google.client_id,
		});
	}
);

module.exports = router;
