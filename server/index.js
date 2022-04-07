// import application file
const app = require("./app");

// initialize port
const PORT = process.env.PORT || 8080;

// server running up
app.listen(PORT, () => console.log(`API server is running on port ${PORT}`));
