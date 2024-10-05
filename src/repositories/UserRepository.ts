import { Channel, User } from "@/types"
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, DocumentSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { PRO_SUBSCRIPTION, USERS_COLLECTION, SUBSCRIPTION_TYPES_COLLECTION } from "@/app/utils/constants";
import { ICreateUserRequestData, IAddChannelRequestData, IUserRepository, SubscriptionDetails } from "@/types";

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
  async getUsers(): Promise<User[]> {
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
  async getUserById(userId: string): Promise<User | undefined> {
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
    const subscriptionDetailsData = subscriptionDetailsDoc?.data();

    const subscriptionDetails: SubscriptionDetails = {
      channels_limit: subscriptionDetailsData?.channels_limit,
      name: subscriptionDetailsData?.name,
      recipients_limit: subscriptionDetailsData?.recipients_limit,
      report_alert_keywords_limit: subscriptionDetailsData?.report_alert_keywords_limit,
    }

    const channelsCollectionRef = collection(doc.ref, "channels");
    const channelsSnapshot = await getDocs(channelsCollectionRef);
    const channels = channelsSnapshot.docs.map(doc => {
      return {
        id: doc.id,
        main_category: doc.data().main_category,
        sub_category: doc.data().sub_category,
        real_time_alert_keywords: doc.data().real_time_alert_keywords,
        report_alert_keywords: doc.data().report_alert_keywords,
        recipients: doc.data().recipients,
        quote_context: doc.data().quote_context,
        tags: doc.data().tags,
      }
    }
    );

    const user: User = {
      id: doc?.id,
      firstName: doc?.data().firstName,
      lastName: doc?.data().lastName,
      email: doc?.data().email,
      phoneNo: doc?.data().phoneNo,
      street: doc?.data().street,
      city: doc?.data().city,
      country: doc?.data().country,
      channels: channels,
      postalCode: doc?.data().postalCode,
      subscription_type: doc?.data().subscription_type,
      subscriptionDetails: subscriptionDetails,
    }

    return user;
  }

  //Add Channel
  async addChannel(userId: string, channelId: string, channelData: IAddChannelRequestData): Promise<void> {
    try {

      // First check if channel with the same ID already exists
      const userDocRef = doc(db, USERS_COLLECTION, userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      const channelsCollectionRef = collection(userDocRef, 'channels');

      // Check if a channel with the given channelId already exists
      // const channelQuery = query(channelsCollectionRef, where('channelId', '==', channelId));
      // const querySnapshot = await getDocs(channelQuery);

      // Check if a channel with the given channelId already exists
      const channelDocRef = doc(channelsCollectionRef, channelId);
      const channelDoc = await getDoc(channelDocRef);

      if (channelDoc.exists()) {
        // Channel with the given channelId exists
        throw new Error("Channel already exists");
      }

      // if (!querySnapshot.empty) {
      //   console.log("Channel already exists");
      //   throw new Error("Channel already exists");
      // }

      // Add the new channel document to the channels collection
      const newChannelDocRef = doc(channelsCollectionRef, channelId);
      await setDoc(newChannelDocRef, channelData);

      /*
      const userData = userDoc.data();
      const channels = userData?.channels;
 
      if (!channels || channels[channelId]) {
        throw new Error("Channel already exists");
      }
 
      // Update the user's document with the modified channelData
      await updateDoc(userDocRef, {
        [`channels.${channelId}`]: channelData
      });
      */

    } catch (error) {
      console.error("Error adding channel: ", error);
      throw error;
    }
  }

  // Get Channel
  async getChannel(userId: string, channelId: string): Promise<Channel> {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      const channelsCollectionRef = collection(userDocRef, 'channels');

      // Get a reference to the specific channel document
      const channelDocRef = doc(channelsCollectionRef, channelId);

      // Fetch the channel document
      const channelDoc = await getDoc(channelDocRef);
      if (!channelDoc.exists()) {
        throw new Error("Channel not found");
      }

      const channelData = channelDoc.data();

      return {
        id: channelDoc.id,
        main_category: channelData.main_category,
        sub_category: channelData.sub_category,
        real_time_alert_keywords: channelData.real_time_alert_keywords,
        report_alert_keywords: channelData.report_alert_keywords,
        recipients: channelData.recipients,
        quote_context: channelData.quote_context,
        tags: channelData.tags,
      };

    } catch (error) {
      console.error("Error getting channel: ", error);
      throw error;
    }
  }

  // Get Channels
  async getChannels(userId: string): Promise<Channel[]> {
    try {
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      const channelsCollectionRef = collection(userDocRef, "channels");

      // Fetch all channels
      const channelsSnapshot = await getDocs(channelsCollectionRef);
      const channels = channelsSnapshot.docs.map(doc => {
        return {
          id: doc.id,
          main_category: doc.data().main_category,
          sub_category: doc.data().sub_category,
          real_time_alert_keywords: doc.data().real_time_alert_keywords,
          report_alert_keywords: doc.data().report_alert_keywords,
          recipients: doc.data().recipients,
          quote_context: doc.data().quote_context,
          tags: doc.data().tags,
        }
      }
      );

      const channelsData: Channel[] = channels.map(channel => {
        return {
          id: channel.id,
          main_category: channel.main_category,
          sub_category: channel.sub_category,
          real_time_alert_keywords: channel.real_time_alert_keywords,
          report_alert_keywords: channel.report_alert_keywords,
          recipients: channel.recipients,
          quote_context: channel.quote_context,
          tags: channel.tags,
        }
      });

      return channelsData;


    } catch (error) {
      console.error("Error getting channels: ", error);
      throw error;
    }
  }

  // Update Channel
  async updateChannel(userId: string, channelId: string, updatedChannel: Channel): Promise<void> {
    try {

      console.log("updateChannel() Repo. : ", userId, channelId, updatedChannel);


      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get a reference to the user's channels collection
      const channelsCollectionRef = collection(userDocRef, 'channels');

      // Get a reference to the specific channel document
      const userChannelDocRef = doc(channelsCollectionRef, channelId);

      // Fetch the channel document
      const channelDoc = await getDoc(userChannelDocRef);
      if (!channelDoc.exists()) {
        throw new Error("Channel not found");
      }

      // Get the current channel data
      const existingChannel = channelDoc.data();

      // Update the channel data with the new values
      existingChannel.real_time_alert_keywords = updatedChannel.real_time_alert_keywords;
      existingChannel.report_alert_keywords = updatedChannel.report_alert_keywords;
      existingChannel.recipients = updatedChannel.recipients;
      existingChannel.quote_context = updatedChannel.quote_context;
      existingChannel.tags = updatedChannel.tags;

      // Save the updated channel object back to the channels collection
      await updateDoc(userChannelDocRef, existingChannel);

    } catch (error) {
      console.error("Error updating channel: ", error);
    }
  }

  // Delete Channel
  async deleteChannel(userId: string, channelId: string): Promise<void> {
    try {
      /*
      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);

      // Fetch the user's document
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      // Get a reference to the user's channels collection
      const channelsCollectionRef = collection(userDocRef, 'channels');

      // Get a reference to the specific channel document
      const channelDocRef = doc(channelsCollectionRef, channelId);

      // Fetch the channel document
      const channelDoc = await getDoc(channelDocRef);
      if (!channelDoc.exists()) {
        throw new Error("Channel not found");
      }
        
      */

      const channelDoc = await this.getChannelSnapshot(userId, channelId);

      // Delete the channel document from the channels collection
      await deleteDoc(channelDoc.ref);

    } catch (error) {
      console.error("Error deleting channel: ", error);
    }
  }

  //Add Real-time Alert Keyword

  /*
  
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
  */

  /*
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
  */

  /*
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
  */

  /*
  // Add Tags
  async addTags(userId: string, channelId: string, tags: string[]) { }

  */

  // update Profile
  async updateProfile(updatedData: Partial<User>, userId: string) {
    try {
      console.log("updateProfile in UserRepository");

      console.log("level 3 - Updated User: ", userId, updatedData);

      // Get a reference to the user's document
      const userDocRef = doc(db, USERS_COLLECTION, userId);
      await updateDoc(userDocRef, updatedData);
      console.log("Level 4 - Updated Successfully!");

    } catch (error) {
      console.error("Error updating profile: ", error);
      throw error;
    }
  }

  // Private method to get the channel snapshot
  private async getChannelSnapshot(userId: string, channelId: string): Promise<DocumentSnapshot<Channel>> {
    // Get a reference to the user's document
    const userDocRef = doc(db, USERS_COLLECTION, userId);

    // Fetch the user's document
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User document does not exist");
    }

    const channelsCollectionRef = collection(userDocRef, 'channels');

    // Get a reference to the specific channel document
    const channelDocRef = doc(channelsCollectionRef, channelId);

    // Fetch the channel document
    const channelDoc = await getDoc(channelDocRef);
    if (!channelDoc.exists()) {
      throw new Error("Channel not found");
    }

    return channelDoc as DocumentSnapshot<Channel>;
  }

}
