import { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Typography } from "antd";
import { Status, Task, Urgency } from "../lib/types/taskTypes";
import "../styles/modal.scss";
import TextArea from "antd/es/input/TextArea";

const TaskModal = ({
  visible,
  onClose,
  onSave,
  task,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<Urgency>("low");
  const [status, setStatus] = useState<Status>("new");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setUrgency(task.urgency);
      setStatus(task.status);
      setCreatedAt(task.createdAt);
    }
  }, [task]);

  const handleSave = () => {
    const newTask: Task = {
      id: task?.id || Date.now().toString(),
      title,
      description,
      urgency,
      status,
      createdAt: new Date(createdAt).toISOString(),
    };
    onSave(newTask);
  };

  return (
    <Modal
      open={visible}
      centered
      onCancel={onClose}
      footer={null}
      title={task ? "Details & Edit Task" : "Add New Task"}
      className="task-modal"
    >
      <Typography.Title level={5}>Title</Typography.Title>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="task-modal-title"
      />
      <Typography.Title level={5}>Description</Typography.Title>
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={4}
        className="task-modal-desc"
      />
      <Typography.Title level={5}>Urgency</Typography.Title>
      <Select
        value={urgency}
        onChange={setUrgency}
        className="task-modal-urgency"
      >
        <Select.Option value="low">Low</Select.Option>
        <Select.Option value="high">High</Select.Option>
        <Select.Option value="urgent">Urgent</Select.Option>
      </Select>
      {task ? (
        <>
          <Typography.Title level={5}>Description</Typography.Title>
          <Select
            value={status}
            onChange={setStatus}
            className="task-modal-status"
          >
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="inprogress">In Progress</Select.Option>
            <Select.Option value="done">Done</Select.Option>
          </Select>
        </>
      ) : null}
      <Button onClick={handleSave} className="task-modal-button">
        Save
      </Button>
    </Modal>
  );
};

export default TaskModal;
