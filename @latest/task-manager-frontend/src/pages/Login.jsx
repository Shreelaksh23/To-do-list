import { useState } from "react";
import api from "../api/axiosInstance";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", form);

    // Save token properly
    localStorage.setItem("token", res.data.token);

    setMessage("Login successful!");
  } catch (err) {
    setMessage(err.response?.data?.message || "Invalid login");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md mt-10">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-3 text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
