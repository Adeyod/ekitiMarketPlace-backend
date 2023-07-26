const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// CONTROLLER IMPORTS
const {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  uploadProductImage,
  updateProductStatus,
} = require('../controller/productsController');

// ADD PRODUCT
router.post('/add-product', addProduct);

// GET ALL PRODUCTS
router.post('/get-products', getProducts);

// GET A PRODUCT BY ITS ID
router.get('/get-product-by-id/:id', getProductById);

// PRODUCT EDIT
router.put('/edit-product/:id', authMiddleware, editProduct);

// TO DELETE A PRODUCT
router.delete('/delete-product/:id', authMiddleware, deleteProduct);

// MULTER GETS IMAGE FROM PC
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

// IMAGE UPLOAD TO CLOUDIANRY
router.post(
  '/upload-image-to-product',
  authMiddleware,
  multer({ storage: storage }).single('file'),
  uploadProductImage
);

// PRODUCT STATUS UPDATE
router.put('/update-product-status/:id', authMiddleware, updateProductStatus);

module.exports = router;
