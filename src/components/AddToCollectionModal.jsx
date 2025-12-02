import { useState, useEffect } from "react";

const AddToCollectionModal = ({
  open,
  onClose,
  availableCollections,
  onAdd,
}) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      availableCollections.filter((col) =>
        col.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, availableCollections]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add to Collection</h2>
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <ul className="space-y-2">
          {filtered.map((col) => (
            <li
              key={col.id}
              className="flex justify-between items-center p-2 border rounded hover:bg-gray-100 cursor-pointer"
            >
              <span>{col.title}</span>
              <button
                className="text-blue-500 underline"
                onClick={() => onAdd(col.id)}
              >
                Add
              </button>
            </li>
          ))}
          {filtered.length === 0 && <p>No collections found</p>}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddToCollectionModal;
