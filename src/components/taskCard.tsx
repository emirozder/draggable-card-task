import {
  Button,
  Card,
  Flex,
  message,
  Popconfirm,
  PopconfirmProps,
  Typography,
} from "antd";
import { Task } from "../lib/types/taskTypes.tsx";
import { formatDate } from "../lib/helpers.ts";
import { DeleteOutlined } from "@ant-design/icons";
import "../styles/card.scss";

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => {
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    onDelete(task);
    e?.stopPropagation();
    message.success("Task deleted successfully!");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    e?.stopPropagation();
  };
  return (
    <Card
      title={
        <Typography className={"task-card-title"}>{task.title}</Typography>
      }
      extra={
        <div className="task-card-header">
          <Typography>{formatDate(task.createdAt)}</Typography>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </Popconfirm>
        </div>
      }
      style={{ borderRadius: "20px" }}
      onClick={() => onEdit(task)}
    >
      <Flex className="task-card-content">
        <Typography className="task-card-desc">{task.description}</Typography>
        <Typography
          className="task-card-urgency"
          style={{
            color:
              task.urgency === "urgent"
                ? "red"
                : task.urgency === "high"
                  ? "orange"
                  : "blue",
          }}
        >
          {task.urgency.toUpperCase()}
        </Typography>
      </Flex>
    </Card>
  );
};

export default TaskCard;
