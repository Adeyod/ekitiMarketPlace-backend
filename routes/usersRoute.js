const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  newUserReg,
  userLogin,
  getCurrentUser,
  getAllUsers,
  updateUserStatus,
} = require('../controller/usersController');

// router.get('/register', (req, res) => {
//   res.send('register here');
// });

// NEW USER REGISTRATION
router.post('/register', newUserReg);

// USER LOGIN
router.post('/login', userLogin);

// GET CURRENT USER
router.get('/get-current-user', authMiddleware, getCurrentUser);

// GET ALL USERS
router.get('/get-users', authMiddleware, getAllUsers);

// UPDATE USER STATUS
router.put('/update-user-status/:id', authMiddleware, updateUserStatus);

module.exports = router;
