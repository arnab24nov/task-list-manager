import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStat, setFilterStat] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusCount, setStatusCount] = useState({
    todo: 0,
    inProgress: 0,
    done: 0,
  });

  // Fetch initial task data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      const mappedTasks = data.slice(0, 20).map((task, index) => ({
        id: index + 1,
        taskId: task.id,
        title: task.title,
        description: task.title,
        status: task.completed ? "Done" : "To Do",
      }));
      setTasks(mappedTasks);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let newTasks = filterStat
      ? tasks.filter((task) => task.status === filterStat)
      : tasks;
    setFilteredTasks(newTasks);

    if (searchQuery) {
      let newTasks = searchQuery
        ? tasks.filter((task) =>
            [task.title, task.description].some((el) =>
              el.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        : tasks;
      setFilteredTasks(newTasks);
    }
    getStatusCount();
  }, [tasks, filterStat, searchQuery]);

  function getStatusCount() {
    let todo = 0;
    let inProgress = 0;
    let done = 0;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === "Done") {
        // eslint-disable-next-line no-unused-vars
        done++;
      } else if (tasks[i].status === "To Do") {
        // eslint-disable-next-line no-unused-vars
        todo++;
      } else {
        // eslint-disable-next-line no-unused-vars
        inProgress++;
      }
    }
    setStatusCount({
      todo,
      inProgress,
      done,
    });
  }

  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
    toast.success("Task added successfully!");
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );
    toast.info("Task updated successfully!");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== id));
    toast.error("Task deleted successfully!");
  };

  return (
    <div className="app">
      <h1 className="font-bold text-2xl text-center m-4">Task List Manager</h1>
      <ToastContainer />
      <div className="flex justify-between items-center w-full mb-4">
        <div>
          <label htmlFor="filter">Filter by Status:</label>
          <select
            id="filter"
            className="border border-black"
            onChange={(e) => setFilterStat(e.target.value)}
          >
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-black w-72 h-8 rounded-lg px-4"
        />
      </div>
      <TaskTable
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <div className="flex items-center gap-10">
        <div>To Do: {statusCount.todo}</div>
        <div>In Progress: {statusCount.inProgress}</div>
        <div>Done: {statusCount.done}</div>
      </div>
      <AddTaskForm addTask={addTask} />
    </div>
  );
};

export default App;
