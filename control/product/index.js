const model = require("../../schems/product/index");
const productSchema = model.productSchema;
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
const middleware = upload.single("image");
const uploadToCloud = async (path) => {
  const result = await cloudinary.uploader.upload(path);
  return result;
};
exports.addProducts = async (req, res, next) => {
  let Add = async () => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (result.asset_id) {
        fs.unlinkSync(req.file.path);
        req.body.img = result.url;
        const newProduct = new productSchema(req.body);
        newProduct.save();
        res.json(newProduct).status(200);
      }
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  };
  middleware(req, res, Add);
};

exports.updateProductDetails = (req, res, next) => {
  const id = req.params.id;
  const controller = async () => {
    try {
      if (req.body.img == "") delete req.body.img;
      const update = await productSchema.findOneAndUpdate(
        { _id: id },
        req.body
      );
      res.json(update).status(200);
    } catch (error) {
      res.json(error);
    }
  };
  const imageController = async () => {
    if (req.file) {
      const result = await uploadToCloud(req.file.path);
      fs.unlinkSync(req.file.path);
      req.body.img = result.url;
      controller();
    }else controller()
  };
    middleware(req, res, imageController);
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
