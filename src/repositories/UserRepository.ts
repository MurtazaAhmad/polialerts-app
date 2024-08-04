import { User } from "@/types"
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { USERS_COLLECTION } from "@/app/utils/constants";

interface IUserRepository {
  getUsers(): Promise<User[]>;
  getUserById(userId: string): Promise<any | undefined>;
}

export class UserRepository implements IUserRepository {
  //Fetch All Users
  async getUsers() {
    const usersCollection = collection(db, USERS_COLLECTION);
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      channels: doc.data().channels,
      subscription_type: doc.data().subscription_type,
    }))
    return userList;
  }

  //Fetch User By Id
  async getUserById(userId: string) {
    console.log("userId", userId);

    const userCollection = collection(db, USERS_COLLECTION);
    const userSnapshot = await getDocs(userCollection);
    const doc = userSnapshot.docs.find(doc => doc.id === userId);
    const user = {
      id: doc?.id,
      name: doc?.data().name,
      channels: doc?.data().channels,
      subscription_type: doc?.data().subscription_type,
    }
    return user;
  }
}
