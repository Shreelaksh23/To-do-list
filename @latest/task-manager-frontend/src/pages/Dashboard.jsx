import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks/all");
        setTasks(res.data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
  try {
    await api.delete(`/tasks/delete/${id}`);

    // Remove task from UI without refreshing
    setTasks(tasks.filter((t) => t._id !== id));

  } catch (error) {
    console.error("Delete failed:", error);
  }
};
const handleComplete = async (id) => {
  try {
    const res = await api.patch(`/tasks/complete/${id}`);

    // Update UI (set isCompleted = true)
    setTasks(tasks.map((t) =>
      t._id === id ? { ...t, isCompleted: true } : t
    ));

  } catch (error) {
    console.error("Complete failed:", error);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>

        <Link 
          to="/add-task"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700"
        >
          + Add New Task
        </Link>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task._id} 
                className={`p-4 rounded-lg shadow flex justify-between items-center ${
                task.isCompleted ? "bg-green-100 line-through" : "bg-gray-50"
                }`}
              >
                <div>
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="text-gray-600">{task.description}</p>

                  <p className="text-sm text-gray-400">
                    {task.category} • {task.priority} •{" "}
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleComplete(task._id)}
                    className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                    ✓ Complete
                  </button>
                    <Link
                    to={`/edit/${task._id}`}
                    className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                    Edit
                    </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
