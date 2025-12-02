import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const UNSPLASH_BASE = "https://api.unsplash.com";

const Collections = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);

  // Fetch all collections
  const {
    data: collections = [],
    isLoading: loadingCollections,
    isError,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await axios.get(`${UNSPLASH_BASE}/collections`, {
        params: { client_id: import.meta.env.VITE_API_KEY, per_page: 30 },
      });
      return res.data;
    },
  });

  // Fetch images inside selected collection
  const { data: images = [], isLoading: loadingImages } = useQuery({
    queryKey: ["collectionImages", selectedCollectionId],
    queryFn: async () => {
      const res = await axios.get(
        `${UNSPLASH_BASE}/collections/${selectedCollectionId}/photos`,
        {
          params: { client_id: import.meta.env.VITE_API_KEY, per_page: 30 },
        }
      );
      return res.data;
    },
    enabled: !!selectedCollectionId,
  });

  if (loadingCollections) return <p className="p-8">Loading collections...</p>;
  if (isError)
    return <p className="p-8 text-red-500">Error loading collections.</p>;

  return (
    <main className="p-8 pt-50">
      <h1 className="text-3xl font-bold mb-6">Collections</h1>

      {/* Collections list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {collections.map((col) => (
          <li
            key={col.id}
            className={`border rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition ${
              selectedCollectionId === col.id ? "bg-gray-100" : ""
            }`}
            onClick={() =>
              setSelectedCollectionId(
                selectedCollectionId === col.id ? null : col.id
              )
            }
          >
            <h2 className="text-xl font-bold">{col.title}</h2>
            {col.total_photos !== undefined && (
              <p className="text-gray-600">{col.total_photos} photos</p>
            )}
          </li>
        ))}
      </ul>

      {/* Images inside selected collection */}
      {selectedCollectionId && (
        <>
          <h2 className="text-2xl font-bold mb-4">Images in this collection</h2>

          {loadingImages ? (
            <p>Loading images...</p>
          ) : images.length === 0 ? (
            <p>No images found in this collection.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <Link
                  to={`/landing/${img.id}`}
                  key={img.id}
                  className="border rounded shadow overflow-hidden block"
                >
                  <img
                    src={img.urls.small}
                    alt={img.alt_description || "Unsplash image"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-sm font-semibold">{img.user.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Collections;
