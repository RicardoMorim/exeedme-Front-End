import { Link } from "react-router";
import { FiClock, FiCheckSquare, FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50">
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Master Your Productivity
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Harness the power of focused work sessions and organized tasks
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/timer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FiClock /> Start Focusing
            </Link>
            <Link
              to="/todo"
              className="bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FiCheckSquare /> View Tasks
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <FiClock className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Smart Pomodoro Timer
            </h3>
            <p className="text-gray-600 mb-4">
              Alternate between focused work sessions and refreshing breaks
              using science-backed intervals.
            </p>
            <Link
              to="/timer"
              className="text-purple-600 font-medium inline-flex items-center gap-2"
            >
              Explore Timer <FiArrowRight />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <FiCheckSquare className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Dynamic Task Management
            </h3>
            <p className="text-gray-600 mb-4">
              Organize your workflow with an intuitive todo list that keeps you
              on track and motivated.
            </p>
            <Link
              to="/todo"
              className="text-purple-600 font-medium inline-flex items-center gap-2"
            >
              Manage Tasks <FiArrowRight />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
