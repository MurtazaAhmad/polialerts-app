// /hooks/useUsers.ts
import { useState } from "react";
import { Channel, User } from "@/types";
import { UserRepository } from "@/repositories/UserRepository";
import { KeywordRepository } from "@/repositories/KeywordRepository";
import { ICreateUserRequestData } from "@/types";

// Hook to deal with user Collection Methods
export const useUser = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: ICreateUserRequestData) => {
    console.log("createUser():", userData);

    setLoading(true);
    const userRepository = new UserRepository();
    try {
      await userRepository.createUser(userData);
    } catch (error) {
      setError("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (userId: string | null | undefined) => {
    setLoading(true);
    console.log("fetchUser() Called");

    if (!userId) return;
    const userRepository = new UserRepository();
    try {
      const userInfo = await userRepository.getUserById(userId);
      console.log("userInfo", userInfo);
      if (!userInfo) return undefined;
      let user = userInfo as User;
      setUserDetails(user);
      return user;
    } catch (error) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  //Add Channel
  const addChannel = async (mainCategory: string, subCategory: string, channelId: string) => {
    setLoading(true);

    const userRepository = new UserRepository();

    try {
      let channelData = {
        main_category: mainCategory,
        sub_category: subCategory,
        real_time_alert_keywords: [],
        report_alert_keywords: [],
        recipients: [],
        quote_context: 20,
        tags: [],
      };

      if (!userDetails?.id) throw new Error("User not found.");

      // Adding Channel
      await userRepository.addChannel(userDetails?.id, channelId, channelData);
      setLoading(false);


    } catch (error) {
      setLoading(false);
      setError("Failed to add channel.");

    }
  }

  // Get Channels
  const getChannels = async () => {
    setLoading(true);
    const userRepository = new UserRepository();
    try {
      if (!userDetails?.id) throw new Error("User not found.");
      const channels = await userRepository.getChannels(userDetails?.id);
      console.log("Channels: ", channels);
    } catch (error) {
      setError("Failed to fetch channels.");
    } finally {
      setLoading(false);
    }
  }

  // Update Channel
  const updateChannel = async (channelId: string, updatedChannel: Channel) => {
    console.log("updateChannel():", channelId, updatedChannel);

    setLoading(true);
    const userRepository = new UserRepository();
    const keywordRepository = new KeywordRepository();

    try {
      if (!userDetails?.id) throw new Error("User not found.");

      // Get Channel
      let channel = await userRepository.getChannel(userDetails?.id, channelId);

      let initialRealTimeAlertKeywords = channel.real_time_alert_keywords;

      let newRealTimeAlertKeywords = updatedChannel.real_time_alert_keywords;

      // Find the difference between the two arrays
      let differenceInKeywords = newRealTimeAlertKeywords.filter(x => !initialRealTimeAlertKeywords.includes(x));
      console.log("Difference:", differenceInKeywords);

      // Which keywords are removed
      let removedKeywords = initialRealTimeAlertKeywords.filter(x => !newRealTimeAlertKeywords.includes(x));
      console.log("Removed Keywords:", removedKeywords);

      await userRepository.updateChannel(userDetails?.id, channelId, updatedChannel);

      // Remove Keywords
      for (let keyword of removedKeywords) {
        console.log("To be removed: ", keyword);
        await keywordRepository.deleteKeyword(userDetails?.id, channelId, keyword);
      }

      // Add New keywords
      for (let keyword of differenceInKeywords) {
        await keywordRepository.addKeyword(userDetails?.id, channelId, keyword);
      }


      setLoading(false);

    } catch (error) {
      setLoading(false);
      setError("Failed to update channel.");
    }
  }

  // Delete Channel
  const deleteChannel = async (channelId: string) => {
    setLoading(true);
    const userRepository = new UserRepository();
    try {
      if (!userDetails?.id) throw new Error("User not found.");
      await userRepository.deleteChannel(userDetails?.id, channelId);
      console.log("Channel Deleted Successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to delete channel.");
    }
  }

  // Add Real-time Alert Keywords
  const addRealTimeAlertKeyword = async (channelId: string, realTimeAlertKeyword: string) => {
    setLoading(true);
    const userRepository = new UserRepository();
    try {
      if (!userDetails?.id) throw new Error("User not found.");
      console.log("Level 1:", userDetails?.id, channelId, realTimeAlertKeyword);
      await userRepository.addRealTimeAlertKeyword(userDetails?.id, channelId, realTimeAlertKeyword);
    } catch (error) {
      setError("Failed to add real-time alert keyword.");
    } finally {
      setLoading(false);
    }
  }

  // Add Report Alert Keywords
  const addReportAlertKeyword = async (channelId: string, reportAlertKeyword: string) => {
    setLoading(true);
    const userRepository = new UserRepository();
    try {
      if (!userDetails?.id) throw new Error("User not found.");
      console.log("Level 1:", userDetails?.id, channelId, reportAlertKeyword);

      await userRepository.addReportAlertKeyword(userDetails?.id, channelId, reportAlertKeyword);
    } catch (error) {
      setError("Failed to add report alert keyword.");
    } finally {
      setLoading(false);
    }
  }

  // Update Profile
  const updateProfile = async (updatedData: Partial<User>, userId: string) => {
    console.log("Level 1 - updateProfile() in useUser start:");

    setLoading(true);
    const userRepository = new UserRepository();
    console.log("updatedData:", updatedData);

    try {

      console.log("userDetails in updateProfile:", userDetails);


      if (!userId) throw new Error("User not found.");
      console.log("Level 2 - ", updatedData);
      await userRepository.updateProfile(updatedData, userId);
      console.log("Level 5 - Updated");
      setLoading(false);

      console.log("updateProfile() in useUser end");

      // setUserDetails((prevState) => {
      //   if (!prevState) return null; // Handle case when prevState is null

      //   return {
      //     ...prevState,
      //     ...updatedData,
      //   };
      // });


    } catch (error) {
      console.log("Error - updateProfile() in useUser:", error);

      setError("Failed to update profile.");
      setLoading(false);
    }
  };


  return { userDetails, loading, error, createUser, fetchUser, addChannel, addRealTimeAlertKeyword, addReportAlertKeyword, deleteChannel, getChannels, updateChannel, updateProfile };
};
