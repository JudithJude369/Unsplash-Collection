import { Loading } from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import plusImg from "@/assets/images/Plus.svg";
import downloadImg from "@/assets/images/down arrow.svg";
import { useCollectionStore } from "@/store/collectionStore";
import { useState, useRef, useEffect } from "react";

const url = "https://api.unsplash.com";

const Image = () => {
  const { id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const { collections, addImageToCollection, removeCollection } =
    useCollectionStore();

  const {
    data: res,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["photoDetails", id],
    queryFn: async () => {
      const result = await axios.get(`${url}/photos/${id}`, {
        params: { client_id: import.meta.env.VITE_API_KEY },
      });
      return result.data;
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) return <Loading />;
  if (isError)
    return (
      <h4 className="text-center mt-12 text-gray-500">Error loading image</h4>
    );

  const imageCollections = collections.filter((col) =>
    col.images.some((img) => img.id === res.id)
  );

  const availableCollections = collections.filter(
    (col) => !col.images.some((img) => img.id === res.id)
  );

  const filteredCollections = availableCollections.filter((col) =>
    col.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="pt-30 px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={res.urls.regular}
        alt={res.alt_description || "Image"}
        className="rounded shadow-xl object-cover max-w-[900px] w-full mx-auto"
      />

      <section>
        {/* Author */}
        <article className="flex items-center gap-4 mb-4">
          <img
            src={res.user.profile_image.large}
            alt={res.user.name}
            className="rounded-full w-14 h-14"
          />
          <h1 className="font-bold">{res.user.name}</h1>
        </article>

        <p className="my-4">
          Published on {new Date(res.created_at).toLocaleDateString()}
        </p>

        {/* UX Note with link to Collections */}
        <p className="text-gray-500 text-sm mb-2">
          Add this image to your collections. To create new collections, go to{" "}
          <Link
            to="/collections"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Collections page
          </Link>
          .
        </p>

        {/* ✅ BUTTON ROW */}
        <div className="flex gap-4 mb-4 relative" ref={dropdownRef}>
          <button
            className="bg-gray-200 rounded-sm shadow p-2 flex gap-2 items-center justify-center text-[0.875rem]"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <img src={plusImg} alt="Add" /> Add to Collection
          </button>

          <a
            href={res.links.download}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-gray-200 rounded-sm shadow p-4 flex gap-2 items-center justify-center text-[0.875rem]">
              <img src={downloadImg} alt="Download" /> Download
            </button>
          </a>

          {showDropdown && (
            <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded w-60 p-2 z-10">
              <input
                type="text"
                placeholder="Search collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />

              {collections.length === 0 && (
                <li className="text-gray-500 p-2 text-sm">
                  No collections yet. Create one on the Collections page.
                </li>
              )}

              {collections.length > 0 && filteredCollections.length === 0 && (
                <li className="text-gray-400 p-2 text-sm">
                  No matching collections found.
                </li>
              )}

              {collections
                .filter((col) =>
                  col.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((col) => {
                  const alreadyAdded = col.images.some(
                    (img) => img.id === res.id
                  );

                  return (
                    <li
                      key={col.id}
                      className={`p-2 rounded flex justify-between items-center
                    ${
                      alreadyAdded
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100 cursor-pointer"
                    }`}
                      onClick={() => {
                        if (alreadyAdded) return;
                        addImageToCollection(col.id, res);
                        setShowDropdown(false);
                        setSearch("");
                      }}
                    >
                      <span>{col.name}</span>
                      {alreadyAdded && (
                        <span className="text-xs text-green-600 font-semibold">
                          ✔ Added
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>

        {/* ✅ COLLECTIONS THIS IMAGE BELONGS TO (NOW PROPERLY PLACED) */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">This image is in:</h3>

          {imageCollections.length === 0 ? (
            <p className="text-gray-500">None</p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {imageCollections.map((col) => (
                <li
                  key={col.id}
                  className="bg-gray-200 rounded px-3 py-1 flex items-center gap-2"
                >
                  <span className="text-sm font-medium">{col.name}</span>

                  <button
                    onClick={() => removeCollection(col.id)}
                    className="text-red-600 text-xs font-bold hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
};

export default Image;
