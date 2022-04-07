const jwt = require("jsonwebtoken");

// genarate tokem
const tokenGenaration = (user) => {
  const { _id, email, name } = user;

  // bind authenticated data to user
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: _id,
      email,
      name,
    },
    token,
  };
};

module.exports = tokenGenaration;
