import { Link } from "react-router";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-purple-100 transition-all duration-300 hover:scale-105"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            ExeedMe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {["/", "/todo", "/timer"].map((path) => (
              <Link
                key={path}
                to={path}
                className="relative group text-white/90 hover:text-white font-medium transition-all duration-300"
              >
                {path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white/80 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2.5 rounded-lg text-white hover:bg-white/10 transition-all active:scale-95"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-2xl transform transition-all duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-1.5 h-6 mr-3 rounded-full"></span>
              Navigation
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-3 space-y-1">
            {["/", "/todo", "/timer"].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className="group flex items-center px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <span className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                {path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
