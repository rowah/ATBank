//pulling in the validator and is-empty dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

//exports function which takes data keyed in by the user from the front end and validates the data
module.exports = function validateRegisterInput(data) {
  let errors = {};
  //since validator only works with strings, we convert all empty fields to an empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmerPassword = !isEmpty(data.confirmerPassword)
    ? data.confirmerPassword
    : "";

  //checks the username
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name filed cannot be blank";
  }

  //email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  //password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (Validator.isEmpty(data.confirmerPassword)) {
    errors.confirmerPassword = "Confirm password field is required";
  }
  if (Validator.isLength(data.password, { min: 7, max: 30 })) {
    errors.password = "Password must be at least 7 characters";
  }
  if (!Validator.equals(data.password, data.confirmerPassword)) {
    errors.confirmerPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
