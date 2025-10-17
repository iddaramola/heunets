import { useState } from "react";

export default function ItemForm({ onSubmit }: { onSubmit: Function }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
