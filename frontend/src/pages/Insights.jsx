import { useEffect, useState } from "react";
import API from "../api/axios";

function Insights() {
  const [notes, setNotes] = useState([]);

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

  const totalNotes = notes.length;

  const archivedNotes = notes.filter(
    (note) => note.archived
  ).length;

  const categories = {};

  notes.forEach((note) => {
    categories[note.category] =
      (categories[note.category] || 0) + 1;
  });

  return (
    <div style={{ padding: "30px" }}>
      <h1>Insights</h1>

      <h3>Total Notes: {totalNotes}</h3>

      <h3>Archived Notes: {archivedNotes}</h3>

      <br />

      <h2>Categories</h2>

      {Object.keys(categories).map((cat) => (
        <p key={cat}>
          {cat}: {categories[cat]}
        </p>
      ))}
    </div>
  );
}

export default Insights;