import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const firestore = getFirestore();

interface IfirebaseService {
    getCollection: (collectionName: string) => Promise<any[]>;
    addToCollection: (collectionName: string, item: any) => Promise<void>;
    updateInCollection: (collectionName: string, id: string, updatedItem: any) => Promise<void>;
    deleteFromCollection: (collectionName: string, id: string) => Promise<void>;
    }

const firebaseService = {
  getCollection: async (collectionName:string) => {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },
  addToCollection: async (collectionName:string, item) => {
    await addDoc(collection(firestore, collectionName), item);
  },
  updateInCollection: async (collectionName:string, id, updatedItem) => {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, updatedItem);
  },
  deleteFromCollection: async (collectionName:string, id) => {
    const docRef = doc(firestore, collectionName, id);
    await deleteDoc(docRef);
  },
};

export default firebaseService;
