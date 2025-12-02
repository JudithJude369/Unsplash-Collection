import { db } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
} from "firebase/firestore";

// Add image to collection
export const addImageToCollection = async (collectionId, image) => {
  const colRef = doc(db, "collections", collectionId);
  await updateDoc(colRef, {
    images: arrayUnion(image),
  });
};

// Remove image from collection
export const removeImageFromCollection = async (collectionId, image) => {
  const colRef = doc(db, "collections", collectionId);
  await updateDoc(colRef, {
    images: arrayRemove(image),
  });
};

// Get all collections
export const getAllCollections = async () => {
  const colRef = collection(db, "collections");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get collections containing a specific image
export const getCollectionsForImage = async (imageId) => {
  const allCollections = await getAllCollections();
  return allCollections.filter((col) =>
    col.images.some((img) => img.id === imageId)
  );
};

// Get collections that image is NOT in
export const getCollectionsImageNotIn = async (imageId) => {
  const allCollections = await getAllCollections();
  return allCollections.filter(
    (col) => !col.images.some((img) => img.id === imageId)
  );
};
