import { Task } from "./types/taskTypes.tsx";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description for task 1",
    urgency: "urgent",
    status: "new",
    createdAt: "2024-06-16",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description for task 2",
    urgency: "high",
    status: "inprogress",
    createdAt: "2024-06-17",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description for task 3",
    urgency: "low",
    status: "done",
    createdAt: "2024-06-18",
  },
];
