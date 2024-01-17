const { productSchema } = require("../model/index");
const multer = require("multer");
const fs = require("fs");
let fileName = "";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dk7xliskx",
  api_key: "438692264925247",
  api_secret: "u4qojjVcPmV8Nf6_ShKW94tjSpw",
});
const storage = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, cb) => {
    fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
exports.middleware = upload.single("image");
const uploadToCloud = async (path) => {
  const result = await cloudinary.uploader.upload(path);
  return result;
};

exports.addProducts = async (req, res) => {
  try {
    const newProduct = new productSchema(req.body);
    newProduct.save();
    res.json(newProduct).status(200);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

exports.updateProductDetails = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (req.body.img == "") delete req.body.img;
    const update = await productSchema.findOneAndUpdate({ _id: id }, req.body);
    res.json(update).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.imageUpload = async (req, res, next) => {
  if (req.file) {
    const result = await uploadToCloud(req.file.path);
    fs.unlinkSync(req.file.path);
    req.body.img = result.url;
  }
  next();
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await productSchema.findOneAndDelete({ _id: id });
    res.json(deleteProduct).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const Products = await productSchema.find();
    res.json(Products).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Product = await productSchema.findOne({ _id: req.params.id });
    res.json(Product).status(200);
  } catch (error) {
    res.json(error);
  }
};

exports.getYourProducts = async (req, res) => {
  try {
    const products = await productSchema.find({ user: req.params.uid });
    res.json(products).status(200);
  } catch (error) {
    res.json(error);
  }
};
