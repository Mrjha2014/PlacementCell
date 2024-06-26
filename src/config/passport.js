const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport) {
  // Local Strategy for username & password login
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Match User
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          // Match Password
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );

  
  // Serialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize User
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
};
