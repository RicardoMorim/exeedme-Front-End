import { Routes, Route } from "react-router";
import "./styles/App.css";
import Home from "./components/Home/Home";
import TodoList from "./components/Todo/TodoList";
import TimerDisplay from "./components/Timer/TimerDisplay";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { useTimer } from "./hooks/useTimer";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, setTodos } = useTodos();
  const timerProps = useTimer();

  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="todo"
          element={<TodoList todos={todos} setTodos={setTodos} />}
        />
        <Route path="timer" element={<TimerDisplay {...timerProps} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
