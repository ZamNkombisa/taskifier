const mongoose = require("mongoose");

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

// Create the Task model based on the schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
