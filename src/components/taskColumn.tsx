import { TaskCard } from "./taskCard.tsx";
import { Task } from "../lib/types/taskTypes.tsx";
import "../styles/column.scss";
import { Draggable } from "@hello-pangea/dnd";

const TaskColumn = ({
  title,
  tasks,
  onEdit,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => {
  return (
    <>
      <div className="task-column-header">
        <h2>{title}</h2>
        <h2>Total: {tasks.length}</h2>
      </div>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TaskColumn;
