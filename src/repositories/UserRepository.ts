import { Channel, User } from "@/types"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { PRO_SUBSCRIPTION, USERS_COLLECTION, SUBSCRIPTION_TYPES_COLLECTION } from "@/app/utils/constants";
import { ICreateUserRequestData, IAddChannelRequestData, IUserRepository } from "@/types";



export class UserRepository implements IUserRepository {

  async createUser(userData: ICreateUserRequestData) {
    console.log("createUser() Repo. : ", userData);

    // Add a new document with a generated id.
    const res = await setDoc(doc(db, USERS_COLLECTION, userData.id), {
      firstName: userData.firstName,
      lastName: userData.lastName,
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
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      email: doc.data().email,
      channels: doc.data().channels,
      subscription_type: doc.data().subscription_type,
      subscriptionDetails: doc.data().subscriptionDetails,
    }))
    return userList;
  }

  //Fetch User By Id
  async getUserById(userId: string) {
    console.log("userId", userId);

    const userCollection = collection(db, USERS_COLLECTION);
    const userSnapshot = await getDocs(userCollection);
    const doc = userSnapshot.docs.find(doc => doc.id === userId);

    if (!doc) {
      return undefined;
    }

    // get subscription info
    const subscription_type = doc?.data().subscription_type;
    const subscriptionDetailsCollection = collection(db, SUBSCRIPTION_TYPES_COLLECTION);
    const subscriptionDetailsSnapshot = await getDocs(subscriptionDetailsCollection);
    const subscriptionDetailsDoc = subscriptionDetailsSnapshot.docs.find(doc => doc.id === subscription_type);
    const subscriptionDetails = subscriptionDetailsDoc?.data();

    const user = {
      id: doc?.id,
      firstName: doc?.data().firstName,
      lastName: doc?.data().lastName,
      channels: doc?.data().channels,
      email: doc?.data().email,
      phoneNo: doc?.data().phoneNo,
      street: doc?.data().street,
      city: doc?.data().city,
      country: doc?.data().country,
      postalCode: doc?.data().postalCode,
      subscription_type: doc?.data().subscription_type,
      subscriptionDetails: subscriptionDetails,
    }
    return user;
  }

  //Add Channel
  async addChannel(userId: string, channelId: string, channelData: IAddChannelRequestData) {
    try {

      // First check if channel with the same ID already exists
      const userDocRef = doc(db, USERS_COLLECTION, userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      const userData = userDoc.data();
      const channels = userData?.channels;

      if (!channels || channels[channelId]) {
        throw new Error("Channel already exists");
      }

      // Update the user's document with the modified channelData
      await updateDoc(userDocRef, {
        [`channels.${channelId}`]: channelData
      });

    } catch (error) {
      console.error("Error adding channel: ", error);
      throw error;
    }
  }

  // Get Channels
  async getChannels(userId: string) {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the user's data
      const userData = userDoc.data();
      const channels = userData?.channels;

      return channels;
    } catch (error) {
      console.error("Error getting channels: ", error);
    }
  }

  // Update Channel
  async updateChannel(userId: string, channelId: string, updatedChannel: Channel) {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current channels array
      const userData = userDoc.data();
      const channels = userData?.channels;

      if (!channels || !channels[channelId]) {
        throw new Error("Channel not found");
      }

      const existingChannel = channels[channelId];
      existingChannel.real_time_alert_keywords = updatedChannel.real_time_alert_keywords;
      existingChannel.report_alert_keywords = updatedChannel.report_alert_keywords;
      existingChannel.recipients = updatedChannel.recipients;
      existingChannel.quote_context = updatedChannel.quote_context;
      existingChannel.tags = updatedChannel.tags;

      // Save the updated channel object back to the user's document
      await updateDoc(userDocRef, { [`channels.${channelId}`]: updatedChannel });

    } catch (error) {
      console.error("Error updating channel: ", error);
    }
  }

  // Delete Channel
  async deleteChannel(userId: string, channelId: string) {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current channels array
      const userData = userDoc.data();
      const channels = userData?.channels;

      if (!channels || !channels[channelId]) {
        throw new Error("Channel not found");
      }

      // Remove both key and value from the channels object
      delete channels[channelId];

      // Save the updated channels object back to the user's document
      await updateDoc(userDocRef, {
        channels: channels
      });

    } catch (error) {
      console.error("Error deleting channel: ", error);
    }
  }

  //Add Real-time Alert Keyword
  async addRealTimeAlertKeyword(userId: string, channelId: string, realTimeAlertKeyword: string) {
    try {

      console.log("Level 1", userId, channelId, realTimeAlertKeyword);


      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get the current channels array
      const userData = userDoc.data();
      console.log("Level 4", userData);

      const channels = userData?.channels;

      if (!channels || !channels[channelId]) {
        throw new Error("Channel not found");
      }

      const updatedChannel = channels[channelId];

      // Checking if the real_time_alert_keywords array exists
      if (!updatedChannel.real_time_alert_keywords) {
        updatedChannel.real_time_alert_keywords = [];
      }

      if (!updatedChannel.real_time_alert_keywords.includes(realTimeAlertKeyword)) {
        updatedChannel.real_time_alert_keywords.push(realTimeAlertKeyword);
      }

      // Save the updated channels object back to the user's document
      await updateDoc(userDocRef, { [`channels.${channelId}`]: updatedChannel });

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

      if (!channels || !channels[channelId]) {
        throw new Error("Channel not found");
      }

      const updatedChannel = channels[channelId];

      // Checking if the real_time_alert_keywords array exists
      if (!updatedChannel.report_alert_keywords) {
        updatedChannel.report_alert_keywords = [];
      }

      if (!updatedChannel.report_alert_keywords.includes(reportAlertKeyword)) {
        updatedChannel.report_alert_keywords.push(reportAlertKeyword);
      }

      // Save the updated channels object back to the user's document
      await updateDoc(userDocRef, { [`channels.${channelId}`]: updatedChannel });

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

      if (!channels || !channels[channelId]) {
        throw new Error("Channel not found");
      }

      const updatedChannel = channels[channelId];

      // Checking if the real_time_alert_keywords array exists
      if (!updatedChannel.recipients) {
        updatedChannel.recipients = [];
      }

      if (!updatedChannel.recipients.includes(recipient)) {
        updatedChannel.recipients.push(recipient);
      }

      // Save the updated channels object back to the user's document
      await updateDoc(userDocRef, { [`channels.${channelId}`]: updatedChannel });

      console.log("Done...");

    } catch (error) {
      console.error("Error adding recipient: ", error);
    }
  }

  // Add Tags
  async addTags(userId: string, channelId: string, tags: string[]) { }

  // update Profile
  async updateProfile(userId: string, updatedData: Partial<User>) {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userDocRef, updatedData);
    } catch (error) {
      console.error("Error updating profile: ", error);
      throw error;
    }
  }


}
