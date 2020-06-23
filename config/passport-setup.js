const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys.js');
const User = require('../models/user-model');
const mongoose = require('mongoose');

passport.use(
	new GoogleStrategy(
		{
			// options
			callbackURL: '/auth/google/redirect',
			clientID: keys.google.client_id,
			clientSecret: keys.google.client_secret,
		},
		(accessToken, refreshTOken, profile, done) => {
			new User({
				username: profile.displayName,
				googleID: profile.id,
			})
				.save()
				.then((newUser) => {
					console.log('Created new user: ' + newUser);
				});

			done();
		}
	)
);
