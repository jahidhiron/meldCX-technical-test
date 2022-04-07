const { check } = require("express-validator");
const createError = require("http-errors");

const User = require("../../models/User");

// server side login validator
const loginValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (email) => {
      try {
        // if email exist then throw error
        const isAlreadyAUser = await User.findOne({ email });
        if (!isAlreadyAUser) {
          throw createError("Invalid Credential!");
        }
      } catch (error) {
        throw createError(error);
      }
    }),
];

module.exports = { loginValidator };
