import { Link } from "react-router";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-purple-100 transition-colors"
          >
            ExeedMe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-white/90 hover:text-white font-medium transition-all hover:translate-y-[-2px]"
            >
              Home
            </Link>
            <Link
              to="/todo"
              className="text-white/90 hover:text-white font-medium transition-all hover:translate-y-[-2px]"
            >
              Todo
            </Link>
            <Link
              to="/timer"
              className="text-white/90 hover:text-white font-medium transition-all hover:translate-y-[-2px]"
            >
              Timer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
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
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Menu
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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

          <div className="px-2 py-3 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/todo"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              Todo
            </Link>
            <Link
              to="/timer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              Timer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
