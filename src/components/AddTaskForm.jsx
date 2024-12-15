import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskId: Date.now(),
      title,
      description,
      status,
    };
    addTask(newTask);
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  return (
    <form onSubmit={handleSubmit} className="my-6 bg-[#CDCDCD] p-2">
      <h2 className="font-semibold text-xl">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border border-black rounded-lg"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-black rounded-lg"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-black rounded-lg"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button
        type="submit"
        className="px-4 rounded-lg border border-black bg-[#ABABAB]"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
