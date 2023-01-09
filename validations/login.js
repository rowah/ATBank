const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //converts empty email and password inputs into empty strings
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  //email validation
  if (validator.isEmpty(data.email)) {
    errors.email = "Email cannot be blank";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (!Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
