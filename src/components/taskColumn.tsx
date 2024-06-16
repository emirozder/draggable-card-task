import { useDrop } from "react-dnd";
import { TaskCard } from "./taskCard.tsx";
import { Status, Task } from "../lib/types/taskTypes.tsx";
import "../styles/column.scss";

const TaskColumn = ({
  title,
  tasks,
  onEdit,
  onDelete,
  onDrop,
}: {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDrop: (task: Task, status: Status) => void;
}) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (task: Task) => onDrop(task, title.toLowerCase() as Status),
  });

  return (
    <div ref={drop} className="task-column">
      <div className="task-column-header">
        <h2>{title}</h2>
        <h2>Total: {tasks.length}</h2>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
