import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">

        <h1 className="text-xl font-bold">Task Manager</h1>

        <div className="space-x-6">
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
