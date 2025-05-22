/*const Task = require('../models/Task');

// יצירת משימה חדשה
const createTask = async (req, res) => {
  try {
    const { date, taskName, time, location, color } = req.body;

    const newTask = new Task({
      date,
      taskName,
      time,
      location,
      color,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// קבלת כל המשימות
const getAllTasks = async (req, res) => {
    console.log("hiiii");
    
  try {
    const tasks = await Task.find().sort({ date: 1, time: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// קבלת משימה לפי ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};

// עדכון משימה לפי ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// מחיקת משימה לפי ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
*/


const Task = require('../models/Task'); 

// יצירת משימה חדשה
const createTask = async (req, res) => {
  try {
    const { date, taskName, time, location, color } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: userCode missing in token' });
    }

    const newTask = new Task({
      date,
      taskName,
      time,
      location,
      color,
      userId
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// קבלת כל המשימות לפי userCode
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: userCode missing in token' });
    }

    const tasks = await Task.find({ userId }).sort({ date: 1, time: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// קבלת משימה לפי ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const task = await Task.findOne({ _id: id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task', error: err.message });
  }
};

// עדכון משימה לפי ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const updates = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found or not authorized' });

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// מחיקת משימה לפי ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) return res.status(404).json({ message: 'Task not found or not authorized' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
