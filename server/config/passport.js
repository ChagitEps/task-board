const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // התאימי לשם המודל שלך

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },

  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const picture = profile.photos[0].value;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password: "google" });
    }

    // שמור בפרופיל המשתמש רק בתוך session, בלי לשמור בבסיס הנתונים
    user._googleProfile = { name, picture };

    return done(null, user);
  }
));


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
