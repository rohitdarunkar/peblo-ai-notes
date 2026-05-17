import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CreateNote() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/notes", {
        ...form,
        tags: form.tags.split(","),
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to create note");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Create Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="content"
          placeholder="Content"
          rows="6"
          cols="40"
          value={form.content}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="tags"
          placeholder="tags separated by commas"
          value={form.tags}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;