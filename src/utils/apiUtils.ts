import toast from "react-hot-toast";

// Utility function to handle API requests
export const apiRequest = async (requestFunc: () => Promise<any>, successMessage?: string) => {
  try {
    const response = await requestFunc();
    if (successMessage) {
      toast.success(successMessage);
    }
    return response;
  } catch (error) {
    console.error("API Error:", error); // Log the error for debugging
    toast.error("An error occurred while processing your request."); // Notify user of the error
    throw error; // Re-throw the error for further handling if needed
  }
};
