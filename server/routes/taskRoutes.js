const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new task
router.post("/", async (req, res) => {
  try {
    const { title, completed, assignedUser, deadline } = req.body;

    // Create a new task object
    const newTask = new Task({
      title,
      completed,
      assignedUser,
      deadline,
    });

    // Save the new task to the database
    await newTask.save();

    res.status(201).json(newTask); // Respond with the newly created task
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, assignedUser, deadline } = req.body;

    // Update the task in the database
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed, assignedUser, deadline },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask); // Respond with the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
