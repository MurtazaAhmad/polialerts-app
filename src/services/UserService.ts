import { UserRepository } from "@/repositories/UserRepository";
import { User } from "@/types";

export class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
      }
}