import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files);
      console.log("filepath", files.file.filepath);
      var oldPath = files.file.filepath;
      let fileName = Date.now().toString() + "_" + files.file.originalFilename;
      console.log("filename", fileName);
      //   var newPath = `./public/uploads/${files.file.originalFilename}`;
      var newPath = `./public/uploads/${fileName}`;
      console.log("new path", newPath);
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ fields, files, newPath });
    });
  });
};

