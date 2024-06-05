import React from "react";

function Filter({ setFilter, filterTasks }) {
  // Component for filtering tasks based on user input

  return (
    <div>
      {/* Input field to enter filter criteria */}
      <input type="text" onChange={(e) => setFilter(e.target.value)} />
      {/* Button to apply the filter */}
      <button onClick={filterTasks}>Apply Filter</button>
    </div>
  );
}

export default Filter;
