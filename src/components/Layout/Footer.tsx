export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm md:text-base">
          © {new Date().getFullYear()} Ricardo Morim
          <span className="mx-2">•</span>
          <span className="opacity-90">ExeedMe Challenge</span>
        </p>
      </div>
    </footer>
  );
}
