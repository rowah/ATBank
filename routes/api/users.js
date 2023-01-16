//pulling in required dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

//loads input validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

//loads model
const User = require("../../models/User");

//The register endpoint

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  //creates errors and isValid vars from data from the user in front-end
  const { errors, isValid } = validateRegisterInput(req.body);
  //validating the register form submitted by user
  //if there is any invalid entry, return the appropriate error from the errors object
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //if details are valid, check the User collection in the db for the user in the form then look up email (checks if user already exists)
  User.findOne({ email: req.body.email }).then((user) => {
    //email already exists
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //create/register the newUser
      const newUser = new User({
        name: req.body.name,
        email: req.user.email,
        password: req.user.password,
      });
      //hash the password before storing it in the db using bcryptjs
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//The login endpoint
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //validating the login form submitted by user
  //if there is any invalid entry, return the appropriate error from the errors object
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //create email and password variables for data from user
  const email = req.body.email;
  const password = req.body.password;

  //find the user from the db using their email
  User.findOne({ email }).then((user) => {
    //check user existence
    if (!user) {
      return res.status(404).json({ emilnotfound: "Email not found" });
    }
  });
});
