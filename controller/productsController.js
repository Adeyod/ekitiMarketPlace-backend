const Product = require('../models/productModel');
const User = require('../models/userModel');

const cloudinary = require('../config/cloudinaryConfig');
// const multer = require('multer');

const Notification = require('../models/notificationModels');

// // ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    // SENDING NOTIFICATION TO ADMIN
    const admins = await User.find({ role: 'admin' });
    admins.forEach(async (admin) => {
      const newNotification = new Notification({
        user: admin._id,
        message: `New Product added by ${req?.seller?.name}`,

        // message: 'New Product added',
        title: 'New Product',
        onClick: '/admin',
        read: false,
      });
      // console.log('message');
      await newNotification.save();
    });
    res.send({
      success: true,
      message: 'Product added Successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// // GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const { seller, category = [], status } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    // console.log(seller);
    if (status) {
      filters.status = status;
    }

    // FILTER BY CATEGORY
    if (category.length > 0) {
      filters.category = { $in: category };
    }

    const products = await Product.find(filters).populate('seller').sort({
      createdAt: -1,
    });
    // console.log(products);
    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// // GET A PRODUCT BY ITS ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller');
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// // PRODUCT EDIT
const editProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: 'Product update is successful',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// // TO DELETE A PRODUCT
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Product has been deleted',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// // IMAGE UPLOAD TO CLOUDIANRY
const uploadProductImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `Ekiti MarketPlace`,
    });
    const productId = req.body.productId;
    await Product.findByIdAndUpdate(productId, {
      $push: { images: result.secure_url },
      // $push: { images: result.secure_url, public_id: result.public_id },
    });
    res.send({
      success: true,
      message: 'Image upload successful',
      data: result.secure_url,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// // PRODUCT STATUS UPDATE
const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;
    // await Product.findByIdAndUpdate(req.params.id, { status });
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      status,
    });

    // SENDING NOTIFICATION TO SELLER
    const newNotification = new Notification({
      user: updatedProduct.seller,
      message: `Your product ${updatedProduct.name} has been ${status}`,
      title: 'Product status updated',
      onClick: '/profile',
      read: false,
    });
    await newNotification.save();

    res.send({
      success: true,
      message: 'Product status update successful',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  uploadProductImage,
  updateProductStatus,
};
