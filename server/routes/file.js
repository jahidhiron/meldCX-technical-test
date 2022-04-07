const router = require("express").Router();

const isAuthenticated = require("../middlewares/auth");
const {
  saveFile,
  getFiles,
  editFileInfo,
  downloadFile,
  deleteFile,
  sendFile,
} = require("../controllers/file");
const uploads = require("../utilities/saveFile");

router.post("/", isAuthenticated, uploads.array("files", 10), saveFile);
router.get("/", isAuthenticated, getFiles);
router.patch("/:id", isAuthenticated, editFileInfo);
router.get("/:publicKey", isAuthenticated, downloadFile);
router.delete("/:privateKey", isAuthenticated, deleteFile);
router.post("/:publicKey", isAuthenticated, sendFile);

module.exports = router;
