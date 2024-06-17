const User = require("../models/User");
const passport = require("passport");

const authController = {
  // Render login page
  getLoginPage: (req, res) => {
    res.render("login", { user: req.user || null });
  },

  // Render register page
  getRegisterPage: (req, res) => {
    res.render("register", { user: req.user || null });
  },

  // Register new user
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if user with email already exists
      let user = await User.findOne({ email });
      if (user) {
        req.flash("error", "Email already exists");
        return res.redirect("/register");
      }

      // Create new user instance
      user = new User({
        name,
        email,
        password,
      });

      // Save new user
      await user.save();
      req.flash("success", "You are registered and can now log in");
      res.redirect("/login");
    } catch (err) {
      console.error('Registration error:', err);
      req.flash("error", "Error during registration");
      res.redirect("/register");
    }
  },

  // Process login
  login: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Login error:', err);
        req.flash('error', 'Login error');
        return next(err);
      }
      if (!user) {
        req.flash('error', info.message);
        return res.redirect('/login');
      }
      req.logIn(user, async (err) => {
        if (err) {
          req.flash('error', 'Error in login process');
          return next(err);
        }
        try {
          // Update user's last login timestamp
          // user.lastLogin = Date.now();
          await user.save();
          req.flash('success', 'Successfully logged in');
          res.redirect('/jobs'); // Redirect to '/jobs' after successful login
        } catch (saveErr) {
          console.error('Error updating last login:', saveErr);
          req.flash('error', 'Error updating last login');
          res.redirect('/login');
        }
      });
    })(req, res, next);
  },

  // Logout user
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        req.flash("error", "Error during logout");
      }
      req.flash("success", "You are logged out");
      res.redirect("/login");
    });
  },
};

module.exports = authController;
