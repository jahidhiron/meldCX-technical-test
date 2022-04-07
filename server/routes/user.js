const router = require("express").Router();

const { signup, signupWithGoogle } = require("../controllers/user");
const { addUserValidator } = require("../middlewares/validators/user");
const { validationResults } = require("../middlewares/validators/results");

router.post("/", addUserValidator, validationResults, signup);
router.post("/signup-with-google", signupWithGoogle);

module.exports = router;
