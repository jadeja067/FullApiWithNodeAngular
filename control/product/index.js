const model = require("../../schems/product/index");
const productSchema = model.productSchema;
const multer = require('multer')
const fs = require('fs')
let fileName = ''
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dk7xliskx',
  api_key: '438692264925247',
  api_secret: 'u4qojjVcPmV8Nf6_ShKW94tjSpw', 
});
const storage = multer.diskStorage({
  destination: './upload',
  filename: (req, file, cb) => {
    fileName = Date.now() + '-' + file.originalname
    cb(null, fileName); 
  }
});
const upload = multer({ storage: storage });
const middleware = upload.single('image');

exports.addProducts =  async (req, res, next) => {
  let Add = async () => {
    try{
      const result = await cloudinary.uploader.upload(req.file.path);
      if(result.asset_id){
        fs.unlinkSync(req.file.path)
        req.body.img = result.url
        const newProduct = new productSchema(req.body);
        newProduct.save();
        res.json(newProduct).status(200);
      }
    }catch(e){
      console.log(e);
      res.json(e)
    }
  }
  middleware(req, res, Add);
  
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
