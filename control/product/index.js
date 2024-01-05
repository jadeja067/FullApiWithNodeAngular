const model = require("../../schems/product/index");
const productSchema = model.productSchema;
const multer = require('multer')
const storage = multer.diskStorage({
  destination: './',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });
exports.addProducts = async (req, res) => {
  console.log(req.body)
  try {
    upload.single('image')
    const newProduct = new productSchema(req.body[0]);
    newProduct.save();
    res.json(newProduct).status(200);
  } catch (error) {
    console.log(error);
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
    const Product = await productSchema.findOne({_id: req.params.id});
    res.json(Product).status(200);
  } catch (error) {
    res.json(error);
  }
};
