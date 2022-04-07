const { uuid } = require("uuidv4");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const File = require("../models/File");
const User = require("../models/User");

// upload file
const saveFile = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id, protocol, files } = req;
    const reqFiles = [];

    const url = protocol + "://" + req.get("host");
    for (var i = 0; i < files.length; i++) {
      reqFiles.push(
        url + "/public/" + process.env.FOLDER + "/" + files[i].filename
      );
    }

    const publicKey = uuid();
    const privateKey = uuid();

    const newFiles = new File({
      userId: id,
      title,
      desc,
      files: reqFiles,
      publicKey,
      privateKey,
    });

    await newFiles.save();
    res.status(201).json(newFiles);
  } catch (error) {
    res.status(500).json({
      message:
        "Only .png, .jpg, .jpeg, .gif, .html, .json, .csv, .pdf, .docx, .mp4, .mp3 format allowed!",
    });
  }
};

// edit file information
const editFileInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: "No Data found!" });
    }

    const file = await File.findOne({ _id: id, userId: req.id });
    if (!file) {
      res.status(404).json({ message: "No Data found!" });
    }

    file.title = title ? title : file.title;
    file.desc = desc ? desc : file.desc;
    await file.save();

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// fetch all matched file info
const getFiles = async (req, res) => {
  try {
    const { id } = req;
    const files = await File.find({ userId: id });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// download file
const downloadFile = async (req, res) => {
  try {
    const { publicKey } = req.params;
    const { fileName } = req.query;
    const file = await File.findOne({ publicKey });

    let pathName = "";

    // match file from files arrat
    if (file.files.length) {
      file.files.map((file) => {
        if (file.includes(fileName)) {
          pathName = file;
          pathName = pathName.replace("http://127.0.0.1:8080/", "");
        }
      });
    }

    res.status(200).download(pathName, fileName);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// delete file and collection
const deleteFile = async (req, res) => {
  try {
    const { privateKey } = req.params;
    const { fileName } = req.query;
    const { id } = req;
    let file = await File.findOne({ privateKey, userId: id });
    let pathName = "";

    // privateKey containing user only primite to delete storage
    if (privateKey !== "undefined") {
      if (file) {
        // delete single file element from array of files

        // match file from files arrat
        if (file.files.length) {
          file.files.map((file) => {
            if (file.includes(fileName)) {
              pathName = file;
              pathName = pathName.replace("http://127.0.0.1:8080/", "");
            }
          });
        }
      }

      // delete main storage
      fs.unlink(pathName, function (err) {
        if (err) throw err;
      });

      // if files array not contain multiple array then delete whole collection with storage
      if (file.files.length) {
        if (file.files.length === 1) {
          await File.deleteOne({ privateKey, userId: id });
        } else {
          // update file collection instead of delete
          file.files.map(async (f, i) => {
            if (f.includes(fileName)) {
              if (i > -1) {
                file.files.splice(i, 1);
              }
            }
          });
          await file.save();
        }
      }
    } else {
      // only able to delete collection not storage
      file = await File.findOne({ userId: id });
      if (!file) {
        return res.status(404).json({ message: "You are not able to delete!" });
      }
      await File.deleteOne({ userId: id });
    }

    res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// share file with public key
const sendFile = async (req, res) => {
  try {
    const { publicKey } = req.params;
    const { email, fileName } = req.body;
    const { id } = req;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const file = await File.findOne({ publicKey, userId: id });

    // match file from files arrat
    let sendFileData = "";
    if (file) {
      if (file.files.length) {
        file.files.map((file) => {
          if (file.includes(fileName)) {
            sendFileData = file;
          }
        });
      }
    }

    // create collection only instead of create storage as we share collection
    const newFile = new File({
      userId: user._id,
      email,
      title: file.title,
      desc: file.desc,
      publicKey: file.publicKey,
      files: [sendFileData],
    });
    if (email === req.email) {
      return res.status(404).json({ message: "You can't send file yourself!" });
    }
    await newFile.save();

    res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveFile,
  getFiles,
  editFileInfo,
  downloadFile,
  deleteFile,
  sendFile,
};
