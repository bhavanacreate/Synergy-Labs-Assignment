import { apiRequest } from "../utils/apiUtils"; // Import the apiRequest utility

export const editUser = async (id: number, userData: any) => {
  return apiRequest(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  }, "User updated successfully!");
};
