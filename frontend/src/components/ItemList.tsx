export default function ItemList({ items }: { items: any[] }) {
  if (!items.length) return <p>No items yet.</p>;
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((i) => (
        <li key={i.id} style={{ border: "1px solid #ddd", margin: "8px 0", padding: 8, borderRadius: 6 }}>
          <strong>{i.title}</strong>
          <p>{i.description}</p>
          <small>{new Date(i.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
