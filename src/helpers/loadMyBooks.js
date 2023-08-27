import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadMyBooks = async ({ displayName }) => {
  try {
    const collectionRef = collection(
      FirebaseDB,
      `/library-users/${displayName}/MyBooks`
    );
    const orderedQuery = query(collectionRef, orderBy("date", "asc"));
    const docs = await getDocs(orderedQuery);

    const myBooks = [];
    docs.forEach((doc) => {
      myBooks.push({ id: doc.id, ...doc.data() });
    });

    return myBooks;
  } catch (error) {
    console.log(error);
  }
};
