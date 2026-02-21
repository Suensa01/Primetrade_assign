import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const role = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // FETCH TASKS
  // =========================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Failed to load tasks");
    }
  };

  // =========================
  // CREATE TASK
  // =========================
  const createTask = async () => {
    try {
      await API.post("/tasks", {
        title,
        description,
        status: "PENDING",
      });

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch {
      alert("Failed to create task");
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Delete failed");
    }
  };

  // =========================
  // UPDATE TASK (MARK COMPLETE)
  // =========================
  const updateTask = async (task) => {
    try {
      await API.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        status: "COMPLETED",
      });

      fetchTasks();
    } catch {
      alert("Update failed");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Dashboard</h2>

        <h3>Role: {role}</h3>

        <button onClick={logout} style={{ marginBottom: "15px" }}>
          Logout
        </button>

        <h3>Create Task</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createTask}>Add Task</button>

        <h3>Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((t) => (
            <div key={t.id} className="task">
              <b>{t.title}</b>
              <p>{t.description}</p>
              <small>Status: {t.status}</small>

              <br />

              {t.status !== "COMPLETED" && (
                <button onClick={() => updateTask(t)}>
                  Mark Complete
                </button>
              )}

              <button
                onClick={() => deleteTask(t.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}