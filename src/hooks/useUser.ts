// /hooks/useUsers.ts
import { useState } from "react";
import { User } from "@/types";
import { UserRepository } from "@/repositories/UserRepository";
import { ICreateUserRequestData } from "@/types";

// Hook to deal with user Collection Methods
export const useUser = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log("useUser(): ", userDetails);

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
    console.log("fetchUser Called");

    if (!userId) return;
    const userRepository = new UserRepository();
    try {
      const userInfo = await userRepository.getUserById(userId);
      console.log("userInfo", userInfo);
      let user = userInfo as User;
      setUserDetails(user);
    } catch (error) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  //Add Channel
  const addChannel = async (main_category: string, sub_category: string) => {
    setLoading(true);

    const userRepository = new UserRepository();
    try {
      let channelData = {
        main_category: main_category,
        sub_category: sub_category,
        real_time_alert_keywords: [],
        report_alert_keywords: [],
        recipient: [],
        quote_context: 20,
        tags: [],
      };
      if (!userDetails?.id) throw new Error("User not found.");

      await userRepository.addChannel(userDetails?.id, channelData);
    } catch (error) {
      setError("Failed to add channel.");
    } finally {
      setLoading(false);
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

  return { userDetails, loading, error, createUser, fetchUser, addChannel, addRealTimeAlertKeyword, addReportAlertKeyword };
};
