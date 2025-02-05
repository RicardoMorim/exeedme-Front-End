import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">
          Pomodoro App
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/todo" className="nav-link">
            Todo
          </Link>
          <Link to="/timer" className="nav-link">
            Timer
          </Link>
        </div>
      </nav>
    </header>
  );
}
