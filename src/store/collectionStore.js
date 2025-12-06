import { create } from "zustand";

const LOCAL_STORAGE_KEY = "collections";

export const useCollectionStore = create((set) => ({
  collections: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],

  addCollection: (name) =>
    set((state) => {
      const newCollection = { id: Date.now(), name, images: [] };
      const updated = [...state.collections, newCollection];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { collections: updated };
    }),

  removeCollection: (collectionId) =>
    set((state) => ({
      collections: state.collections.filter((col) => col.id !== collectionId),
    })),

  addImageToCollection: (collectionId, image) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === collectionId
          ? {
              ...col,
              images: col.images.some((img) => img.id === image.id)
                ? col.images // ✅ prevent duplicate
                : [...col.images, image],
            }
          : col
      ),
    })),

  removeImageFromCollection: (collectionId, imageId) =>
    set((state) => {
      const updated = state.collections.map((col) =>
        col.id === collectionId
          ? { ...col, images: col.images.filter((img) => img.id !== imageId) }
          : col
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { collections: updated };
    }),
}));
