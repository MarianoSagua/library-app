import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadBooks = async () => {
  try {
    const collectionRef = collection(FirebaseDB, "library_books");
    const docs = await getDocs(collectionRef);

    const books = [];
    docs.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });

    return books;
  } catch (error) {
    console.log(error);
  }
};
