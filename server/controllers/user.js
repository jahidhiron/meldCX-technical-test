const bcrypt = require("bcryptjs");

const User = require("../models/User");
const tokenGenaration = require("../utilities/tokenGenaration");

// create user
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // if user exist then throw an error
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User already exist" });
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    // bind user first time to authenticate
    req.id = newUser._id;
    req.name = newUser.name;
    req.email = newUser.email;

    // generate token
    const data = tokenGenaration(newUser);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// signup with google
const signupWithGoogle = async (req, res) => {
  const { email, googleId, name, imageUrl } = req.body;

  try {
    let dataValues = await User.findOne({ email });
    let data = null;

    // if user exist with this particular email then avoid to store user infomation
    if (!dataValues) {
      const newUser = await User.create({
        googleId,
        email,
        role: "user",
        name,
        avatar: imageUrl,
      });

      // if user doesn't exist with this particular email then create new collection with this email
      data = tokenGenaration(newUser);
      return res.status(201).json(data);
    } else {
      data = tokenGenaration(dataValues);
      return res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { signup, signupWithGoogle };
