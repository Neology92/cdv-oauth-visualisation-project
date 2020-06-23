const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys.js');

passport.use(
	new GoogleStrategy(
		{
			// options
			callbackURL: '/auth/google/redirect',
			clientID: keys.google.client_id,
			clientSecret: keys.google.client_secret,
		},
		(accessToken, refreshTOken, profile, done) => {
			done();
		}
	)
);
