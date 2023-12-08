const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async (accessToken, refreshToken, profile, cb) => {
            console.log('User signed in with Google');
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                    });
                }
                return cb(null, user);
            } catch (err) {
                console.log(err);
                return cb(err);
            }
        }
    )
);

passport.serializeUser((user, cb) => {
    console.log('serializeUser', user);
    cb(null, user._id);
});

passport.deserializeUser(async (userId, cb) => {
    console.log('deserializeUser', userId);
    cb(null, await User.findById(userId));
});
