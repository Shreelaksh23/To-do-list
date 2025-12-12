import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    category: ""
  });

  // Fetch task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        const task = res.data;

        setForm({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
          priority: task.priority,
          category: task.category
        });
      } catch (error) {
        console.error("Error loading task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/tasks/update/${id}`, form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
          Edit Task
        </h1>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
          <option>Other</option>
        </select>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
