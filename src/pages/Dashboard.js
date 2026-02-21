import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

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

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Dashboard</h2>

        <button onClick={logout} style={{marginBottom:"15px"}}>
          Logout
        </button>

        <h3>Create Task</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button onClick={createTask}>Add Task</button>

        <h3>Tasks</h3>

        {tasks.map((t)=>(
          <div key={t.id} className="task">
            <b>{t.title}</b>
            <p>{t.description}</p>
          </div>
        ))}

      </div>
    </div>
  );
}