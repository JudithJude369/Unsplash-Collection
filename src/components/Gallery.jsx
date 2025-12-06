// import { useInputStore } from "@/store/inputStore";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import Loading from "./Loading";
// import { useDebounce } from "@/hooks/useDebounce";
// import { Link } from "react-router-dom";

// const url = `https://api.unsplash.com/search/photos?client_id=${
//   import.meta.env.VITE_API_KEY
// }`;

// const Gallery = () => {
//   const inputValue = useInputStore((state) => state.inputValue);

//   // 🔥 Debounce input value before sending request
//   const debouncedValue = useDebounce(inputValue, 800);

//   const response = useQuery({
//     queryKey: ["images", debouncedValue],
//     queryFn: async () => {
//       const result = await axios.get(`${url}&query=${debouncedValue}`);
//       return result.data;
//     },
//     enabled: !!debouncedValue,
//   });

//   // EMPTY STATE
//   if (!debouncedValue) return null;

//   // LOADING
//   if (response.isPending) return <Loading />;

//   // ERROR
//   if (response.isError) {
//     return (
//       <h4 className="text-center mt-12 text-gray-500">
//         There was an error fetching images.
//       </h4>
//     );
//   }

//   // NO RESULTS
//   const res = response.data?.results ?? [];
//   if (res.length < 1) {
//     return (
//       <h4 className="text-center mt-12 text-gray-500">No results found...</h4>
//     );
//   }

//   // SUCCESS → Masonry layout
//   return (
//     <main className="p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
//       {res.map((item) => (
//         <div
//           key={item.id}
//           className="mb-4 break-inside-avoid rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative cursor-pointer group"
//         >
//           <Link to={`/landing/${item.id}`}>
//             <img
//               src={item.urls.regular}
//               alt={item.alt_description || "Unsplash image"}
//               loading="lazy"
//               className="w-full rounded object-cover transform group-hover:scale-105 transition-transform duration-300 "
//             />
//           </Link>
//         </div>
//       ))}
//     </main>
//   );
// };

// export default Gallery;

import { useInputStore } from "@/store/inputStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { useDebounce } from "@/hooks/useDebounce";
import { Link } from "react-router-dom";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const inputValue = useInputStore((state) => state.inputValue);

  // 🔥 Debounce input value before sending request
  const debouncedValue = useDebounce(inputValue, 800);

  const response = useQuery({
    queryKey: ["images", debouncedValue],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${debouncedValue}`);
      return result.data;
    },
    enabled: !!debouncedValue,
  });

  // EMPTY STATE
  if (!debouncedValue) return null;

  // LOADING
  if (response.isPending) return <Loading />;

  // ERROR
  if (response.isError) {
    return (
      <h4 className="text-center mt-12 text-gray-500">
        There was an error fetching images.
      </h4>
    );
  }

  // NO RESULTS
  const res = response.data?.results ?? [];
  if (res.length < 1) {
    return (
      <h4 className="text-center mt-12 text-gray-500">No results found...</h4>
    );
  }

  // SUCCESS → Masonry layout
  return (
    <main className="p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {res.map((item) => (
        <div
          key={item.id}
          className="mb-4 break-inside-avoid rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative cursor-pointer group"
        >
          <Link to={`/landing/${item.id}`} className="block relative">
            <img
              src={item.urls.regular}
              alt={item.alt_description || "Unsplash image"}
              loading="lazy"
              className="w-full rounded object-cover transform group-hover:scale-105 transition-transform duration-300"
            />

            {/* ✅ HOVER OVERLAY */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold bg-black/70 px-4 py-2 rounded">
                Click to view
              </span>
            </div>

            {/* ✅ PHOTOGRAPHER NAME (BOTTOM ON HOVER) */}
            <div className="absolute bottom-2 left-2 right-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Photo by {item.user.name}
            </div>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default Gallery;
