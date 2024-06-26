// Middleware function to ensure authentication before accessing a resource
const ensureAuthenticated = (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Set local variable for authenticated user, or null if not authenticated
    res.locals.user = req.user || null;
    // If authenticated, proceed to the next middleware or route handler

    return next();
  }

  // If not authenticated, set a flash message and redirect to the login page
  req.flash("error", "Please log in to view that resource");
  res.redirect("/login");
};

module.exports = ensureAuthenticated;
