import { Link } from "react-router";
import { FiClock, FiCheckSquare, FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="max-w-6xl mx-auto px-4 py-16 flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            Master Your Productivity
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
            Harness the power of focused work sessions and organized tasks
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/timer"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FiClock className="w-6 h-6" />
              Start Focusing
            </Link>
            <Link
              to="/todo"
              className="inline-flex items-center gap-2 bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FiCheckSquare className="w-6 h-6" />
              View Tasks
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-6">
              <FiClock className="text-5xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Smart Pomodoro Timer
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Alternate between focused work sessions and refreshing breaks
              using 25/5 minutes blocks.
            </p>
            <div className="flex justify-center">
              <Link
                to="/timer"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
              >
                Explore Timer <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-6">
              <FiCheckSquare className="text-5xl text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Dynamic Task Management
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              Organize your workflow with an intuitive todo list that updates in
              real time.
            </p>
            <div className="flex justify-center">
              <Link
                to="/todo"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
              >
                Manage Tasks <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
