const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const Users = mongoose.model('users');

passport.use(
    new GoogleStategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            Users.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser) {
                    // we alredy have a record with the given profile ID
                    done(null, existingUser);
                } else  {
                    // we don't have a user record with this ID, make a new record.
                    new Users( { googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
                }
            })
        }
    )
);
