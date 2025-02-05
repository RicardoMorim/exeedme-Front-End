import { Routes, Route } from "react-router";
import "./styles/App.css";
import Home from "./components/Home/Home";
import TodoList from "./components/Todo/TodoList";
import TimerDisplay from "./components/Timer/TimerDisplay";
import Container from "./components/Layout/Container";
import Header from "./components/Layout/Header";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<TodoList />} />
        <Route path="timer" element={<TimerDisplay />} />
      </Routes>
    </Container>
  );
}

export default App;
