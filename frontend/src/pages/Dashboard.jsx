import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNote = async (id) => {
    try {
      await API.patch(`/notes/archive/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const generateSummary = async (id) => {
    try {
      await API.post(`/notes/summary/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const shareNote = async (id) => {
    try {
      const res = await API.post(`/notes/share/${id}`);

      alert(
        `Share Link: http://localhost:5173/shared/${res.data.shareId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <br />

      <button onClick={() => navigate("/create")}>
        Create Note
      </button>

      <button
        onClick={() => navigate("/insights")}
        style={{ marginLeft: "10px" }}
      >
        Insights
      </button>

      <button
        onClick={logout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search Notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {filteredNotes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>{note.title}</h3>

          <p>{note.content}</p>

          <p>
            <b>Category:</b> {note.category}
          </p>

          <p>
            <b>Tags:</b> {note.tags.join(", ")}
          </p>

          {note.aiSummary && (
            <p>
              <b>AI Summary:</b> {note.aiSummary}
            </p>
          )}

          <button
            onClick={() => navigate(`/edit/${note._id}`)}
          >
            Edit
          </button>

          <button
            onClick={() => deleteNote(note._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>

          <button
            onClick={() => archiveNote(note._id)}
            style={{ marginLeft: "10px" }}
          >
            Archive
          </button>

          <button
            onClick={() => generateSummary(note._id)}
            style={{ marginLeft: "10px" }}
          >
            AI Summary
          </button>

          <button
            onClick={() => shareNote(note._id)}
            style={{ marginLeft: "10px" }}
          >
            Share
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;