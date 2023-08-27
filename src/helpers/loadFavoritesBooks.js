import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadFavoritesBooks = async ({ displayName }) => {
  try {
    const collectionRef = collection(
      FirebaseDB,
      `/library-users/${displayName}/Favorites`
    );
    const docs = await getDocs(collectionRef);

    const favoritesBooks = [];
    docs.forEach((doc) => {
      favoritesBooks.push({ id: doc.id, ...doc.data() });
    });

    return favoritesBooks;
  } catch (error) {
    console.log(error);
  }
};


