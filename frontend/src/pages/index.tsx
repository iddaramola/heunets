import { useEffect, useState } from "react";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

export default function HomePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = ((globalThis as any).process?.env?.NEXT_PUBLIC_API_BASE) || "http://localhost:4000";

  async function fetchItems() {
    const res = await fetch(`${API_BASE}/items`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  async function handleAdd(payload: { title: string; description?: string }) {
    const res = await fetch(`${API_BASE}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <h1>Work Items</h1>
      <ItemForm onSubmit={handleAdd} />
      {loading ? <p>Loading...</p> : <ItemList items={items} />}
    </div>
  );
}
