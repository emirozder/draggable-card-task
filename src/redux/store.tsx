import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice.tsx";
import { loadData, saveData } from "../lib/localStorage.ts";
import { mockTasks } from "../lib/mockData.ts";

const preloadedState = loadData();
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState: {
    tasks: preloadedState ? { tasks: preloadedState } : { tasks: mockTasks },
  },
});

store.subscribe(() => {
  saveData(store.getState().tasks.tasks);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
