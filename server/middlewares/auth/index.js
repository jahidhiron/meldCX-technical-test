const jwt = require("jsonwebtoken");

// authenticate protected route
const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData = null;

    // decode token
    if (token) {
      decodedData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
      req.id = decodedData.id;
      req.name = decodedData.name;
      req.email = decodedData.email;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = authentication;
