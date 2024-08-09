// /hooks/useUsers.ts
import { useState } from "react";
import { User } from "@/types";
import { UserRepository } from "@/repositories/UserRepository";
import { ICreateUserRequestData } from "@/types";
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






  return { userDetails, loading, error, createUser, fetchUser };
};
