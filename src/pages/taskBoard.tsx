import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { Task } from "../lib/types/taskTypes.tsx";
import { addTask, deleteTask, updateTask } from "../redux/taskSlice.tsx";
import TaskColumn from "../components/taskColumn.tsx";
import TaskModal from "../components/taskModal.tsx";
import { Flex } from "antd";

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask(task));
    }
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalVisible(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    console.log("selectedTask", selectedTask);
    dispatch(deleteTask(task?.id || ""));
  };

  const handleDropTask = (
    task: Task,
    status: "new" | "inprogress" | "done",
  ) => {
    dispatch(updateTask({ ...task, status }));
  };

  return (
    <div className="task-board">
      <button onClick={handleAddTask}>Add New</button>
      <Flex gap={"10px"}>
        <TaskColumn
          title="New"
          tasks={tasks.filter((task) => task.status === "new")}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onDrop={handleDropTask}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "inprogress")}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onDrop={handleDropTask}
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.status === "done")}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onDrop={handleDropTask}
        />
      </Flex>
      {isModalVisible && (
        <TaskModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setSelectedTask(null);
          }}
          onSave={handleSaveTask}
          task={selectedTask || undefined}
        />
      )}
    </div>
  );
};

export default TaskBoard;
