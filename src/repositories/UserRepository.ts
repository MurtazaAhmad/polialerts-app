import { Channel, User } from "@/types"
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { PRO_SUBSCRIPTION, USERS_COLLECTION } from "@/app/utils/constants";
import { ICreateUserRequestData, IAddChannelRequestData, IUserRepository } from "@/types";



export class UserRepository implements IUserRepository {

  async createUser(userData: ICreateUserRequestData) {
    console.log("createUser() Repo. : ", userData);

    // Add a new document with a generated id.
    const res = await setDoc(doc(db, USERS_COLLECTION, userData.id), {
      name: userData.name,
      email: userData.email,
      channels: [],
      subscription_type: PRO_SUBSCRIPTION,
    });

    return res;
  }

  //Fetch All Users
  async getUsers() {
    const usersCollection = collection(db, USERS_COLLECTION);
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
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
  async addChannel(userId: string, channelData: IAddChannelRequestData) {
    try {

      // Step 1: Create a new channel document
      const channelsCollectionRef = collection(doc(db, USERS_COLLECTION, userId), 'channels');
      const newChannelDocRef = await addDoc(channelsCollectionRef, {});

      // Step 3: Retrieve the generated ID
      const channelId = newChannelDocRef.id;

      // Step 4: Add the generated ID to the channelData object
      const channelDataWithId = { ...channelData, channelId: channelId };

      // Step 5: Update the user's document with the modified channelData
      const userDocRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userDocRef, {
        channels: arrayUnion(channelDataWithId)
      });

      // Add Channel to channel Array in Users Collection
      // const userDocRef = doc(db, USERS_COLLECTION, userId);
      // await updateDoc(userDocRef, {
      //   channels: arrayUnion(channelData)
      // });

    } catch (error) {
      console.error("Error adding channel: ", error);
    }
  }


  //Add Real-time Alert Keyword
  async addRealTimeAlertKeyword(userId: string, channelId: string, realTimeAlertKeyword: string) {
    try {

      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId); // Replace "userId" with the actual user ID

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current channels array
      const userData = userDoc.data();
      console.log("Level 4", userData);

      const channels = userData?.channels;

      // Find the channel with the matching channelId
      const channelIndex = channels.findIndex((channel: Channel) => channel.channelId === channelId);
      console.log("level 5", channelIndex);

      if (channelIndex === -1) {
        throw new Error("Channel not found");
      }

      const updatedChannel = channels[channelIndex];

      // Checking if the real_time_alert_keywords array exists
      if (!updatedChannel.real_time_alert_keywords) {
        updatedChannel.real_time_alert_keywords = [];
      }

      if (!updatedChannel.real_time_alert_keywords.includes(realTimeAlertKeyword)) {
        updatedChannel.real_time_alert_keywords.push(realTimeAlertKeyword);
      }

      // Save the updated channels array back to the user's document
      channels[channelIndex] = updatedChannel;

      // Save the updated channels array back to the user's document
      await updateDoc(userDocRef, { channels });

      console.log("Done...");

    } catch (error) {
      console.error("Error adding real-time alert keyword: ", error);
    }

  }

  async addReportAlertKeyword(userId: string, channelId: string, reportAlertKeyword: string) {
    try {

      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId); // Replace "userId" with the actual user ID

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current channels array
      const userData = userDoc.data();
      const channels = userData?.channels;

      // Find the channel with the matching channelId
      const channelIndex = channels.findIndex((channel: Channel) => channel.channelId === channelId);

      if (channelIndex === -1) {
        throw new Error("Channel not found");
      }

      const updatedChannel = channels[channelIndex];

      // Checking if the real_time_alert_keywords array exists
      if (!updatedChannel.report_alert_keywords) {
        updatedChannel.report_alert_keywords = [];
      }

      if (!updatedChannel.report_alert_keywords.includes(reportAlertKeyword)) {
        updatedChannel.report_alert_keywords.push(reportAlertKeyword);
      }

      // Save the updated channels array back to the user's document
      channels[channelIndex] = updatedChannel;

      // Save the updated channels array back to the user's document
      await updateDoc(userDocRef, { channels });

      console.log("Done...");

    } catch (error) {
      console.error("Error adding report alert keyword: ", error);
    }
  }

  // Add Recipient
  async addRecipient(userId: string, channelId: string, recipient: string) {
    try {

      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId); // Replace "userId" with the actual user ID

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current channels array
      const userData = userDoc.data();
      const channels = userData?.channels;

      // Find the channel with the matching channelId
      const channelIndex = channels.findIndex((channel: Channel) => channel.channelId === channelId);

      if (channelIndex === -1) {
        throw new Error("Channel not found");
      }

      const updatedChannel = channels[channelIndex];

      // Checking if the real_time_alert_keywords array exists
      if (!updatedChannel.recipients) {
        updatedChannel.recipients = [];
      }

      if (!updatedChannel.recipients.includes(recipient)) {
        updatedChannel.recipients.push(recipient);
      }

      // Save the updated channels array back to the user's document
      channels[channelIndex] = updatedChannel;

      // Save the updated channels array back to the user's document
      await updateDoc(userDocRef, { channels });

      console.log("Done...");

    } catch (error) {
      console.error("Error adding recipient: ", error);
    }
  }

  // Add Tags
  async addTags(userId: string, channelId: string, tags: string[]) { }

}
