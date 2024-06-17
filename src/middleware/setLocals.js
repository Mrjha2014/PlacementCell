// Middleware function to set local variables for flash messages and authenticated user
const setLocals = (req, res, next) => {
  // Set local variable for success flash message
  res.locals.success = req.flash('success');

  // Set local variable for error flash message
  res.locals.error = req.flash('error');

  // Set local variable for authenticated user, or null if not authenticated
  res.locals.user = req.user || null;

  // Proceed to the next middleware function or route handler
  next();
};

module.exports = setLocals;
