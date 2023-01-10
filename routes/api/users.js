//pulling in required dependencies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//loads input validation
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations");

//loads model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  //validating the form submitted by user
  //if there is any invalid entry, return the appropriate error from the errors obj
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //validating email
  //check the User in the db for the user in the form then look up email
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
      //hash the password before storing it in the db
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
