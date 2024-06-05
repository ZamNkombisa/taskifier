import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import AssignTask from "./AssignTask";

function Home() {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle form submission to add a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    if (!task.trim() || !deadline.trim() || !assignedUser) return;
    try {
      // Create new task object
      const newTask = {
        id: tasks.length + 1,
        title: task,
        completed: false,
        assignedTo: assignedUser,
        description: "Sample description",
        deadline: deadline,
      };
      // Send POST request to add task
      const response = await axios.post("http://localhost:3000/tasks", newTask);
      // Update local state with new task
      setTasks([...tasks, response.data]);
      // Clear form fields
      setTask("");
      setDeadline("");
      setAssignedUser("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task from the server and local state
  const deleteTask = async (_id) => {
    try {
      if (!_id) {
        throw new Error("Task ID is required");
      }
      // Send DELETE request to remove task
      await axios.delete(`http://localhost:3000/tasks/${_id}`);
      // Update local state after successful deletion
      setTasks(tasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = (_id) => {
    if (!_id) {
      throw new Error("Task ID is required");
    }
    deleteTask(_id);
  };

  // Update task status (complete/incomplete)
  const updateTaskStatus = async (_id, isCompleted) => {
    try {
      // Send PUT request to update task status
      await axios.put(`http://localhost:3000/tasks/${_id}`, {
        completed: isCompleted,
      });
      // Update local state after successful update
      setTasks(
        tasks.map((task) =>
          task._id === _id ? { ...task, completed: isCompleted } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Handle task completion
  const handleCompleteTask = (task) => {
    if (!task._id) {
      throw new Error("Task ID is required");
    }
    updateTaskStatus(task._id, !task.completed);
  };

  // Open edit popup for task
  const openEditPopup = (task) => {
    setIsEditing(true);
    setEditTaskId(task._id);
    setEditedTaskTitle(task.title);
  };

  // Handle editing of task
  const handleEditTask = async () => {
    try {
      // Create updated task object
      const updatedTask = {
        id: editTaskId,
        title: editedTaskTitle,
        // Include other properties if needed
      };
      // Send PUT request to update task
      await axios.put(`http://localhost:3000/tasks/${editTaskId}`, updatedTask);
      // Update local state with updated task
      setTasks(tasks.map((t) => (t._id === editTaskId ? updatedTask : t)));
      // Close the edit popup
      closeEditPopup();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Close edit popup
  const closeEditPopup = () => {
    setIsEditing(false);
    setEditTaskId(null);
    setEditedTaskTitle("");
  };

  // Filter tasks based on selected filter
  const filteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      case "deadline":
        return tasks.filter((task) => task.deadline);
      case "overdue":
        return tasks.filter(
          (task) => task.deadline && new Date(task.deadline) < new Date()
        );
      default:
        return tasks;
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      {/* Header */}
      <div>
        <header>
          <img
            src="images/Taskifier.jpg"
            alt="Taskifier Logo"
            width={100}
            height={100}
          />
          <h1>TASKIFIER</h1>
        </header>
      </div>
      {/* Main content */}
      <div className="app">
        {/* Task form */}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input"
            placeholder="Enter task title"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input"
          />
          <select
            key="selection"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="input"
          >
            <option value="">Assign to:</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
          </select>
          <button type="submit" className="button">
            Add Task
          </button>
          <AssignTask key="assign" tasks={tasks} />
        </form>
        {/* Task filters */}
        <div className="filters">
          <label>Filter tasks by:</label>
          <select key="selection" value={filter} onChange={handleFilterChange}>
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="incomplete">Tasks to Complete</option>
            <option value="deadline">Tasks with Deadline</option>
            <option value="overdue">Overdue Tasks</option>
          </select>
        </div>
        {/* Task list */}
        {filteredTasks().length > 0 ? (
          <ul className="task-list">
            {filteredTasks().map((task) => (
              <li key={task.id} className="task-item">
                <span className={task.completed ? "completed-task" : ""}>
                  {task.title}
                </span>
                {task.deadline && (
                  <span className="due-date">Due Date: {task.deadline}</span>
                )}
                <span className="assigned-user">
                  Assigned To: {task.assignedUser}
                </span>
                <div className="task-actions">
                  <button
                    type="button"
                    className="task-action complete"
                    onClick={() => handleCompleteTask(task)}
                  >
                    {task.completed ? "completed" : "Complete"}
                  </button>
                  <button
                    type="button"
                    className="task-action edit"
                    onClick={() => openEditPopup(task)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="task-action delete"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found.</p>
        )}
        {/* Edit popup */}
        {isEditing && (
          <div className="edit-popup">
            <input
              type="text"
              value={editedTaskTitle}
              onChange={(e) => setEditedTaskTitle(e.target.value)}
              className="input"
            />
            <button onClick={handleEditTask} className="button">
              Save
            </button>
            <button onClick={closeEditPopup} className="button">
              Cancel
            </button>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="footer">
        <div>Contact Information:</div>
        <div>Email: info@taskifier.com</div>
        <div>Phone: 021-336-7841</div>
      </footer>
    </div>
  );
}

export default Home;
