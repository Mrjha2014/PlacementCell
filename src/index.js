const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const path = require("path");
const app = express();

// Environment Variables
require("dotenv").config();

// Database Connection
const connectDB = require("./config/database");
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/mainLayout');

// Middleware to set flash messages and user information
const setLocals = require("./middleware/setLocals");
app.use(setLocals);

// Routes
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

// Error Handling for Undefined Routes
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
