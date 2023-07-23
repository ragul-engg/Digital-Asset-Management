const express = require("express");
const multer = require("multer");
const Image = require("../model/model");
const router = express.Router();
const sharp = require("sharp");

const DIR = "./images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(" ").join("_");
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post("/upload", upload.single("img"), async (req, res) => {
  try {
    const imgData = new Image({
      fileName: req.file.originalname,
      tag: req.body.tag,
    });
    if ((await Image.find({ fileName: imgData.fileName })).length != 0) {
      res
        .status(400)
        .send({ message: "An image already available with the same name" });
      return;
    }
    sharp(req.file.path)
      .resize(200, 200)
      .toFile(
        "images/thumbnails/" + req.file.originalname,
        (err, resizeImage) => {
          if (err) {
            console.log(err);
          } else {
            console.log(resizeImage);
          }
        }
      );
    await imgData
      .save()
      .then((json) => {
        res.send(json);
      })
      .catch((e) => {
        throw e;
      });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
router.get("/images", async (req, res) => {
  const tag = req.query.tags.toLowerCase();
  const data = await Image.find();
  const filtered_data = data.filter((item) =>
    item.tag.toLowerCase().includes(tag)
  );
  res.send(filtered_data);
});

module.exports = router;
