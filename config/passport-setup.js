const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			// options
			clientID: keys.google.client_id,
			clientSecret: keys.google.client_secret,
			callbackURL: '/auth/google/redirect',
		},
		(accessToken, refreshToken, profile, done) => {
			// check if user already exists in db
			User.findOne({ googleID: profile.id }).then((currentUser) => {
				if (!currentUser) {
					// create new user
					new User({
						username: profile.displayName,
						googleID: profile.id,
					})
						.save()
						.then((newUser) => {
							done(null, newUser);
						});
				} else {
					done(null, currentUser);
				}
			});
		}
	)
);
