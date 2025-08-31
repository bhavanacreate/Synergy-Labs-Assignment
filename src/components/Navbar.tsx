import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 fixed w-full top-0 left-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-start">
              <Link
                to="/"
                className="text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16"></div>
    </>
  );
}
