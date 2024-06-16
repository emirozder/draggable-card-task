import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.tsx";
import { Task } from "../lib/types/taskTypes.tsx";
import {
  addTask,
  deleteTask,
  reorderTasks,
  updateTask,
  updateTaskStatus,
} from "../redux/taskSlice.tsx";
import TaskColumn from "../components/taskColumn.tsx";
import TaskModal from "../components/taskModal.tsx";
import { Button, Flex } from "antd";
import "../styles/board.scss";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    // diff column (set status)
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        updateTaskStatus({
          id: result.draggableId,
          status: destination.droppableId,
        }),
      );
    }
    //same column (reorder task)
    else {
      dispatch(
        reorderTasks({
          sourceIndex: source.index,
          destinationIndex: destination.index,
          status: source.droppableId,
        }),
      );
    }
  };

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

  return (
    <div className="task-board">
      <Button
        className="task-board-addBtn"
        size={"large"}
        onClick={handleAddTask}
      >
        Add New
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex className="task-board-content">
          {["new", "inprogress", "done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-column"
                >
                  <TaskColumn
                    title={status.toUpperCase()}
                    tasks={tasks.filter((task) => task.status === status)}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </Flex>
      </DragDropContext>
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
