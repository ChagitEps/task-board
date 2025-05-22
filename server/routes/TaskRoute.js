const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');
const verifyJWT=require('../middleware/verifyJWT')
// יצירת משימה
router.post('/',verifyJWT,taskController.createTask);

// שליפת כל המשימות
router.get('/',verifyJWT, taskController.getAllTasks);

// שליפת משימה לפי ID
router.get('/:id', taskController.getTaskById);

// עדכון משימה לפי ID
router.put('/:id', taskController.updateTask);

// מחיקת משימה לפי ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
