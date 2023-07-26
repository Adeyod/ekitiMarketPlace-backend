const Notification = require('../models/notificationModels');

// ADD NOTIFICATION
const addNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: 'Notification added successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL NOTIFICATIONS BY USER
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// DELETE A NOTIFICATION
const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// READ ALL NOTIFICATIONS
const readAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.body.userId,
        read: false,
      },
      { $set: { read: true } }
    );
    res.send({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addNotification,
  getAllNotifications,
  deleteNotification,
  readAllNotifications,
};
