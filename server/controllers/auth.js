const bcrypt = require("bcryptjs");

const User = require("../models/User");
const tokenGenaration = require("../utilities/tokenGenaration");

// main functionality to login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // if user doesn't exist avoid login
    if (!existingUser) {
      return res.status(404).json({ message: "Invalid Credential!" });
    }

    // if password doesn't match then avoid login
    const isCorrectUser = await bcrypt.compare(password, existingUser.password);
    if (!isCorrectUser) {
      return res.status(404).json({ message: "Invalid Credential!" });
    }

    const data = tokenGenaration(existingUser);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { login };
