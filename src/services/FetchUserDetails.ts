import { apiRequest } from "../utils/apiUtils"; // Import the apiRequest utility

export const fetchUserDetails = async (id: number) => {
  return apiRequest(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    return response.json();
  });
};
