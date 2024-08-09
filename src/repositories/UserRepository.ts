import { User } from "@/types"
import { doc, getDocs, collection, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { PRO_SUBSCRIPTION, USERS_COLLECTION } from "@/app/utils/constants";
import { ICreateUserRequestData, IUserRepository } from "@/types";



export class UserRepository implements IUserRepository {

  async createUser(user: ICreateUserRequestData) {
    console.log("createUser() Repo. : ", user);

    // Add a new document with a generated id.
    const res = await setDoc(doc(db, USERS_COLLECTION, user.id), {
      name: user.name,
      channels: [],
      subscription_type: PRO_SUBSCRIPTION,
    });
  }

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

  //Add Channel
  async addChannel() {
    console.log("Add Channel");

  }


  //Add Real-time Alert Keyword
  async addRealTimeAlertKeyword() {

  }
}
