import { Routes, Route } from "react-router";
import "./styles/App.css";
import Home from "./components/Home/Home";
import TodoList from "./components/Todo/TodoList";
import TimerDisplay from "./components/Timer/TimerDisplay";
import Container from "./components/Layout/Container";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { useState, useEffect } from "react";
import { Mode, Todo, WatchSkin } from "./types";

function App() {
  // Todos Use State (keep the information even if the todo component unmounts)
  const [todos, setTodos] = useState<Todo[]>([]);

  // Timer Use State
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [time, setTime] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSkin, setCurrentSkin] = useState<WatchSkin>("digital");

  useEffect(() => {
    if (mode === "pomodoro") {
      setTime(25 * 60);
      setInitialTime(25 * 60);
    } else {
      setTime(5 * 60);
      setInitialTime(5 * 60);
    }
  }, [mode, setTime, setInitialTime]);

  const timerProps = {
    mode,
    setMode,
    time,
    setTime,
    initialTime,
    setInitialTime,
    isRunning,
    setIsRunning,
    currentSkin,
    setCurrentSkin,
  };

  return (
    <Container>
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
    </Container>
  );
}

export default App;
