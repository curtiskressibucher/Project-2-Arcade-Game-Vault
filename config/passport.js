const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const DiscordStrategy = require('passport-discord').Strategy;

const User = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async (accessToken, refreshToken, profile, cb) => {
            console.log('User signed in with Google', profile);
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
passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK,
        },
        async (accessToken, refreshToken, profile, cb) => {
            console.log('User signed in with Discord', profile);

            try {
                const avatarURL = profile.avatar
                    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
                    : null;

                let user = await User.findOne({ discordId: profile.id });
                if (!user) {
                    user = await User.create({
                        discordId: profile.id,
                        name: profile.username,
                        email: profile.email,
                        avatar: avatarURL,
                    });
                } else {
                    // Update avatar if it has changed
                    if (avatarURL && user.avatar !== avatarURL) {
                        user.avatar = avatarURL;
                        await user.save();
                    }
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
