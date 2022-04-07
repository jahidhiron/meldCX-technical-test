const { check } = require("express-validator");
const createError = require("http-errors");

const User = require("../../models/User");

// server side validation to create user
const addUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("You should provide a valid name")
    .trim()
    .custom(async (name) => {
      try {
        if (name.length < 4) {
          throw createError("Name is too short, it must be 3 char long!");
        }
      } catch (error) {
        throw createError(error);
      }
    }),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (email) => {
      try {
        const isAlreadyAUser = await User.findOne({ email });
        if (isAlreadyAUser) {
          throw createError("Email already exist!");
        }
      } catch (error) {
        throw createError(error);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 character long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

module.exports = { addUserValidator };
