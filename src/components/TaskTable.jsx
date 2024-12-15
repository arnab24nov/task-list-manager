import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";

// eslint-disable-next-line react/prop-types
const TaskTable = ({ tasks, updateTask, deleteTask }) => {
  const columns = [
    { title: "Task ID", field: "id", editor: false },
    {
      title: "Title",
      field: "title",
      editor: "input",
      cellEdited: (cell) => {
        handleTableChange(cell.getRow().getData());
      },
    },
    {
      title: "Description",
      field: "description",
      editor: "input",
      cellEdited: (cell) => {
        handleTableChange(cell.getRow().getData());
      },
    },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] },
      cellEdited: (cell) => {
        handleTableChange(cell.getRow().getData());
      },
    },
    {
      title: "Actions",
      formatter: "buttonCross",
      width: 100,
      align: "center",
      cellClick: (e, cell) => {
        deleteTask(cell.getRow().getData().taskId);
      },
    },
  ];

  const handleTableChange = (row) => {
    updateTask(row);
  };

  return (
    <div className="max-h-[500px] overflow-auto border border-black">
      <ReactTabulator data={[...tasks]} columns={columns} layout="fitColumns" />
    </div>
  );
};

export default TaskTable;
