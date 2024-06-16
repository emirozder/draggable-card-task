export interface Task {
  id: string;
  title: string;
  description: string;
  urgency: "urgent" | "high" | "low";
  status: "new" | "inprogress" | "done";
  createdAt: string;
}

export type Urgency = "urgent" | "high" | "low";
export type Status = "new" | "inprogress" | "done";
