import "./App.css";
import "./styles/main.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard from "./pages/taskBoard.tsx";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskBoard />
    </DndProvider>
  );
}

export default App;
