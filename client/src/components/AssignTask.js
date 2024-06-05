import React, { useState } from "react";

function AssignTask({ tasks }) {
  // State variables to track the selected task and assigned user
  const [selectedTask, setSelectedTask] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  // Function to handle the task assignment
  const handleAssignTask = () => {
    // Logging the task assignment details
    console.log(`Assigning task '${selectedTask}' to user '${assignedUser}'`);
  };

  return (
    <div className="assign">
      {/* Dropdown to select the task */}
      <select
        key="select-assign"
        value={selectedTask}
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option value="">Select Task</option>
        {/* Mapping through tasks to create dropdown options */}
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
      {/* Input field to specify the assigned user */}
      <input
        type="text"
        value={assignedUser}
        onChange={(e) => setAssignedUser(e.target.value)}
        placeholder="Assign to user"
      />
      {/* Button to trigger the task assignment */}
      <button onClick={handleAssignTask}>Assign Task</button>
    </div>
  );
}

export default AssignTask;
