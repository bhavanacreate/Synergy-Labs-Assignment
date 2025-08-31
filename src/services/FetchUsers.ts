import axios from "axios";
import { User } from "../types/userTypes";
import { apiRequest } from "../utils/apiUtils"; // Import the apiRequest utility

export const fetchUsers = async (): Promise<User[]> => {
  return apiRequest(async () => {
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data; // Return the data from the response
  }, "Users fetched successfully!"); // Success message for toast notification
};
