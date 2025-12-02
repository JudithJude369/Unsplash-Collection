// import { Loading } from "@/components";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import plusImg from "@/assets/images/Plus.svg";
// import downloadImg from "@/assets/images/down arrow.svg";

// const url = "https://api.unsplash.com";

// const Image = () => {
//   const { id } = useParams();
//   const response = useQuery({
//     queryKey: ["photoDetails", id],
//     queryFn: async () => {
//       const result = await axios.get(`${url}/photos/${id}`, {
//         params: {
//           client_id: import.meta.env.VITE_API_KEY,
//         },
//       });
//       return result.data;
//     },
//   });
//   console.log(response.data);

//   if (response.isPending) {
//     return <Loading />;
//   }

//   if (response.isError) {
//     return (
//       <h4 style={{ textAlign: "center", marginTop: "3rem" }}>
//         There was error...
//       </h4>
//     );
//   }

//   const res = response.data;
//   const createdDate = new Date(res.created_at);
//   const formattedDate = createdDate.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <main
//       className="pt-50 px-8  grid grid-cols-1 justify-center lg:grid-cols-2
//    gap-8   text-[#121826] "
//     >
//       <img
//         src={res.urls.regular}
//         alt={res.alt_description}
//         className="rounded object-cover max-w-[900px] w-full shadow-xl"
//       />
//       <section>
//         {/* author details */}
//         <article className="flex items-center gap-4">
//           <img
//             src={res.user.profile_image.large}
//             alt={res.user.name}
//             className="rounded-full object-cover shadow-xl max-w-[60px]"
//           />
//           <h1 className="font-bold">{res.user.name}</h1>
//         </article>

//         <p className="my-4">published on {formattedDate}</p>
//         {/* add to collections */}
//         <div className="flex gap-4 mb-4">
//           <button
//             className="bg-[#E5E7EB] rounded-sm shadow text-[0.875rem] font-bold cursor-pointer p-4 flex gap-2 justify-center"
//             type="button"
//           >
//             <img src={plusImg} alt="" />
//             <p>Add to Collection</p>
//           </button>
//           <button
//             className="bg-[#E5E7EB] rounded-sm shadow text-[0.875rem] font-bold cursor-pointer p-4 flex gap-2 justify-center items-center"
//             type="button"
//           >
//             <img src={downloadImg} alt="" />
//             <p>Download</p>
//           </button>
//         </div>

//         {/* collections */}
//       </section>
//     </main>
//   );
// };

// export default Image;

import { useEffect, useState } from "react";
import { Loading } from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import plusImg from "@/assets/images/Plus.svg";
import downloadImg from "@/assets/images/down arrow.svg";
import AddToCollectionModal from "@/components/AddToCollectionModal";
import {
  addImageToCollection,
  removeImageFromCollection,
  getCollectionsForImage,
  getCollectionsImageNotIn,
} from "@/helpers/collectionHelpers";

const url = "https://api.unsplash.com";

const Image = () => {
  const { id } = useParams();
  const [collections, setCollections] = useState([]);
  const [availableCollections, setAvailableCollections] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch photo from Unsplash
  const response = useQuery({
    queryKey: ["photoDetails", id],
    queryFn: async () => {
      const result = await axios.get(`${url}/photos/${id}`, {
        params: { client_id: import.meta.env.VITE_API_KEY },
      });
      return result.data;
    },
  });

  // Fetch collections image belongs to
  useEffect(() => {
    if (!response.data) return;

    const fetchCollections = async () => {
      const cols = await getCollectionsForImage(id);
      setCollections(cols);
      const avail = await getCollectionsImageNotIn(id);
      setAvailableCollections(avail);
    };
    fetchCollections();
  }, [response.data]);

  if (response.isLoading) return <Loading />;
  if (response.isError)
    return (
      <h4 style={{ textAlign: "center", marginTop: "3rem" }}>
        Error loading image
      </h4>
    );

  const res = response.data;
  const createdDate = new Date(res.created_at);
  const formattedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAddToCollection = async (collectionId) => {
    const imageData = {
      id: res.id,
      url: res.urls.regular,
      author: res.user.name,
      profile_image: res.user.profile_image.medium,
      publishedAt: res.created_at,
    };
    await addImageToCollection(collectionId, imageData);
    setModalOpen(false);

    // Refresh collections
    const cols = await getCollectionsForImage(res.id);
    setCollections(cols);
    const avail = await getCollectionsImageNotIn(res.id);
    setAvailableCollections(avail);
  };

  const handleRemoveFromCollection = async (collectionId) => {
    const imageData = {
      id: res.id,
      url: res.urls.regular,
      author: res.user.name,
      profile_image: res.user.profile_image.medium,
      publishedAt: res.created_at,
    };
    await removeImageFromCollection(collectionId, imageData);

    // Refresh collections
    const cols = await getCollectionsForImage(res.id);
    setCollections(cols);
    const avail = await getCollectionsImageNotIn(res.id);
    setAvailableCollections(avail);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = res.links.download + "?force=true"; // Unsplash download link
    link.download = `${res.id}.jpg`;
    link.click();
  };

  return (
    <main className="pt-50 px-8 grid grid-cols-1 justify-center lg:grid-cols-2 gap-8 text-[#121826]">
      <img
        src={res.urls.regular}
        alt={res.alt_description}
        className="rounded object-cover max-w-[900px] w-full shadow-xl"
      />
      <section>
        {/* Author info */}
        <article className="flex items-center gap-4 mb-4">
          <img
            src={res.user.profile_image.large}
            alt={res.user.name}
            className="rounded-full object-cover shadow-xl max-w-[60px]"
          />
          <h1 className="font-bold">{res.user.name}</h1>
        </article>

        <p className="my-4">Published on {formattedDate}</p>

        {/* Add / Download */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#E5E7EB] rounded-sm shadow text-[0.875rem] font-bold cursor-pointer p-4 flex gap-2 justify-center"
          >
            <img src={plusImg} alt="" />
            <p>Add to Collection</p>
          </button>

          <button
            onClick={handleDownload}
            className="bg-[#E5E7EB] rounded-sm shadow text-[0.875rem] font-bold cursor-pointer p-4 flex gap-2 justify-center items-center"
          >
            <img src={downloadImg} alt="" />
            <p>Download</p>
          </button>
        </div>

        {/* Collections */}
        <div className="mt-6">
          <h2 className="font-bold mb-2">Collections this image is in:</h2>
          {collections.length > 0 ? (
            <ul className="list-disc pl-5">
              {collections.map((col) => (
                <li key={col.id}>
                  {col.title}{" "}
                  <button
                    onClick={() => handleRemoveFromCollection(col.id)}
                    className="ml-2 text-red-500 underline text-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>This image is not in any collections yet.</p>
          )}
        </div>
      </section>

      {/* Modal */}
      <AddToCollectionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        availableCollections={availableCollections}
        onAdd={handleAddToCollection}
      />
    </main>
  );
};

export default Image;
