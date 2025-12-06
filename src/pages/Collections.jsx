import { useState } from "react";
import { useCollectionStore } from "@/store/collectionStore";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const Collections = () => {
  const navigate = useNavigate();

  const {
    collections,
    addCollection,
    removeCollection,
    removeImageFromCollection,
  } = useCollectionStore();

  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState("");

  const selectedCollection = collections.find(
    (col) => col.id === selectedCollectionId
  );

  const handleAddCollection = () => {
    const name = newCollectionName.trim();
    if (!name) return;
    addCollection(name);
    setNewCollectionName("");
  };

  return (
    <main className="px-8 pt-30">
      {/* Back to Image page */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-500 mb-4 hover:text-blue-700"
      >
        <HiArrowLeft /> Back
      </button>

      <h1 className="text-2xl font-bold mb-2">Collections</h1>

      {/* UX Note */}
      <p className="text-gray-500 text-sm mb-6">Create new collections here.</p>

      {/* Create new collection */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New collection name"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddCollection}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Create
        </button>
      </div>

      {/* List of collections */}
      <div className="flex flex-wrap gap-4 mb-8">
        {collections.length === 0 && (
          <p className="text-gray-500">No collections yet.</p>
        )}
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() =>
              setSelectedCollectionId(
                selectedCollectionId === col.id ? null : col.id
              )
            }
            className={`px-4 py-2 rounded shadow text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              selectedCollectionId === col.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {col.name} ({col.images.length})
          </button>
        ))}
      </div>

      {/* Show selected collection images */}
      {selectedCollection && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Images in "{selectedCollection.name}"
          </h2>

          {selectedCollection.images.length === 0 ? (
            <p className="text-gray-500">No images in this collection yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedCollection.images.map((img) => (
                <div
                  key={img.id}
                  className="relative group rounded shadow overflow-hidden"
                >
                  <Link to={`/landing/${img.id}`}>
                    <img
                      src={img.urls.regular}
                      alt={img.alt_description || "Image"}
                      className="w-full h-48 object-cover group-hover:scale-105 transform transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() =>
                      removeImageFromCollection(selectedCollection.id, img.id)
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-90 hover:opacity-100"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Collections;
