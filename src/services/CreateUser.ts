import { apiRequest } from "../utils/apiUtils"; // Import the apiRequest utility

export const createUser = async (userData: any) => {
  return apiRequest(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  }, "User created successfully!");
};
