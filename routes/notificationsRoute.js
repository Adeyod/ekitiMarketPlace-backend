const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

// NOTIFICATION CONTROLLERS
const {
  addNotification,
  getAllNotifications,
  deleteNotification,
  readAllNotifications,
} = require('../controller/notificationsController');

// ADD NOTIFICATION
router.post('/notify', authMiddleware, addNotification);

// GET ALL NOTIFICATIONS BY USER
router.get('/get-all-notifications', authMiddleware, getAllNotifications);

// DELETE A NOTIFICATION
router.delete('/delete-notification/:id', authMiddleware, deleteNotification);

// READ ALL NOTIFICATIONS
router.put('/read-all-notifications', authMiddleware, readAllNotifications);

module.exports = router;
