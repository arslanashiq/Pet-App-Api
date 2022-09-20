const sharp = require("sharp");
const s3 = require("../../config/S3_config/s3.config");
let upload = require("../../config/S3_config/multer.config");
const { TYPE_IMAGE, TYPE_AUDIO } = require("../utils/constants");
const { v1: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");

const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      message: error.message,
    });
  } else {
    res.status(400).send(error);
  }
};

//ORDER_CHANGE_TO_LOWER
const ORDER_CHANGE_TO_LOWER = async (current_order, past_order, schema) => {
  let doc = await schema.find({
    order: {
      $gte: current_order,
      $lte: past_order,
    },
  });
  console.log(doc, "doc");
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order + 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

//_ORDER_CHANGE_TO_UPPER
const ORDER_CHANGE_TO_UPPER = async (current_order, past_order, schema) => {
  let doc = await schema.find({
    order: {
      $gte: past_order,
      $lte: current_order,
    },
  });
  console.log(doc, "this is doc");
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order - 1;
    await Obj.save();
  });
  await Promise.all(promise);
};
const SEND_EMAIL = async (code, receiver) => {
  require("dotenv").config();
  const sg_mail = require("@sendgrid/mail");
  console.log(process.env.EMAIL_API_KEY, "KEY");
  sg_mail.setApiKey(process.env.EMAIL_API_KEY);
  const message = {
    to: receiver,
    from: process.env.EMAIL_FROM,
    subject: "Verification code",
    text: `Here is code you can use to reset password ${code}`,
  };
  const result = await sg_mail
    .send(message)
    .then((res) => {
      console.log("Email Sent");
      return res;
    })
    .catch((err) => {
      console.log("Email did not  Send", err);
      return err;
    });
  return result;
};
///////////Upload File
const UPLOAD_AUDIO_FILE = async (files, resp) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_file = files.audio;
      let file_name = path.extname(files.audio.name);
      //define upload file name store url
      let audio_file_name = uuidv4() + file_name;
      let audio_path = audio_file_name;
      let file_path = "./src/utils/audio/" + audio_file_name;
      fs.mkdirsSync("./src/utils/audio/");
      image_file.mv(file_path, async (err) => {
        if (err) {
          resp.error = true;
          resp.error_message = err;
          return resp;
        } else {
          resolve(audio_path);
        }
      });
    } catch (error) {
      resp.error = true;
      resp.error_message = error;
      return resp;
    }
  });

  return myPromise;
};

const UPLOAD_AND_RESIZE_FILE = async (image_buffer_data, dir, image_size) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_name = uuidv4() + ".jpeg";
      await sharp(image_buffer_data)
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4",
        })
        .resize(image_size)
        .toFile(dir + image_name, async (err, info) => {
          if (err) resolve(false);
        });
      resolve(image_name);
    } catch (error) {
      console.log(error, "error in uploading");
      resolve(false);
    }
  });

  return myPromise;
};

const UPLOAD_S3_IMAGE = async (img_name, dir, image_data) => {
  let response = {};
  let image_file_name = "";
  let savePath = dir;
  image_file_name = img_name;

  sharp(image_data)
    .resize(300, 300)
    .toBuffer(async (err, info) => {
      if (err) {
        console.log(err, "toBuffer error in uploader");
      } else {
        upload.single("file");
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;
        params.Key = savePath + image_file_name;
        params.Body = info;
        params.ContentType = "image/jpeg";
        try {
          let result = await s3Client.upload(params).promise();
          response = image_file_name;
        } catch (err) {
          console.log("error in s3 uploading", err);
        }
      }
    });

  return response;
};

const SEND_NOTIFICATION = async (message) => {
  // Send a message to devices subscribed to the provided topic.
  return admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

const UPLOAD_SINGLE_FILE_on_S3 = async (
  file,
  FILE_PATH,
  file_extension,
  width,
  height = 670
) => {
  let resp = {};
  if (
    file_extension == ".pdf" ||
    file_extension == ".PDF" ||
    file_extension == ".EXCEL" ||
    file_extension == ".excel" ||
    file_extension == ".DOCX" ||
    file_extension == ".docx" ||
    file_extension == ".mp3" ||
    file_extension == ".XLSX" ||
    file_extension == ".xlsx" ||
    file_extension == ".XLS" ||
    file_extension == ".xls" ||
    file_extension == ".CSV" ||
    file_extension == ".csv" ||
    file_extension == ".DOC" ||
    file_extension == ".doc"
  ) {
    const myPromise = new Promise(async (resolve, reject) => {
      let path = FILE_PATH + uuidv4() + file_extension;

      upload.single("file");
      const s3Client = s3.s3Client;
      const params = s3.uploadParams;
      params.Key = path;
      params.Body = file.data;
      params.ContentType = file.mimetype;
      try {
        await s3Client.upload(params).promise();
      } catch (err) {
        resp.error = true;
        resp.error_message = err.message;
        reject(resp);
      }

      resolve(path);
    });
    return myPromise;
  } else {
    const myPromise = new Promise(async (resolve, reject) => {
      let path = FILE_PATH + uuidv4() + file_extension;
      sharp(file.data)
        .resize(width, height, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toBuffer(async (err, info) => {
          if (err) {
            resp.error = true;
            resp.error_message = err.message;
            reject(resp);
          } else {
            upload.single("file");
            const s3Client = s3.s3Client;
            const params = s3.uploadParams;
            params.Key = path;
            params.Body = file.data;
            params.ContentType = file.mimetype;
            try {
              await s3Client.upload(params).promise();
            } catch (err) {
              resp.error = true;
              resp.error_message = err.message;
              reject(resp);
            }
          }
        });
      resolve(path);
    });
    return myPromise;
  }
};

const CHANGE_DEL_ORDER = async (current_order, schema) => {
  let doc = await schema.find({
    order: {
      $gte: current_order,
    },
  });
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order - 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

const MAX_ORDER = async (modelName, query_obj = {}) => {
  let max_order = 0;
  let x;
  x = await modelName
    .findOne(query_obj)
    .sort({ order: -1 })
    .limit(1)
    .select({ order: 1, _id: 0 });
  if (x) {
    max_order = x.order;
  }
  return max_order;
};
module.exports = {
  RENDER_BAD_REQUEST,
  CHANGE_DEL_ORDER,
  ORDER_CHANGE_TO_LOWER,
  ORDER_CHANGE_TO_UPPER,
  SEND_EMAIL,
  UPLOAD_AND_RESIZE_FILE,
  UPLOAD_AUDIO_FILE,
  UPLOAD_S3_IMAGE,
  SEND_NOTIFICATION,
  UPLOAD_SINGLE_FILE_on_S3,
  MAX_ORDER,
};
