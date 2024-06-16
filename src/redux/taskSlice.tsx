import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../lib/types/taskTypes.tsx";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>,
    ) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = status as Task["status"];
      }
    },
    reorderTasks: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number;
        status: string;
      }>,
    ) => {
      const { sourceIndex, destinationIndex, status } = action.payload;
      const tasksInStatus = state.tasks.filter(
        (task) => task.status === status,
      );
      const [movedTask] = tasksInStatus.splice(sourceIndex, 1);
      tasksInStatus.splice(destinationIndex, 0, movedTask);

      state.tasks = state.tasks
        .filter((task) => task.status !== status)
        .concat(tasksInStatus);
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  reorderTasks,
} = taskSlice.actions;
export default taskSlice.reducer;
