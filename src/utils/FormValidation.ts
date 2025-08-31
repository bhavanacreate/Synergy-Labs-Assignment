import { Address } from "../types/userTypes";

export const validateName = (name: string): string | null => {
  if (!name) return "Name is required.";
  if (name.length < 3) return "Name must be at least 3 characters.";
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Invalid email format.";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\d{10,15}$/;
  if (!phone) return "Phone number is required.";
  if (!phoneRegex.test(phone)) return "Invalid phone number.";
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return "Username is required.";
  if (username.length < 3) return "Username must be at least 3 characters.";
  return null;
};

export const validateAddress = (address: Address | undefined): string => {
    if (!address) {
      return "Address is required."; // or any other appropriate message
    }
    
    const { street, city } = address;
  
    if (!street) {
      return "Street is required.";
    }
    if (!city) {
      return "City is required.";
    }
    return "";
  };
  

export const validateCompanyName = (companyName: string): string | null => {
  if (companyName && companyName.length < 3)
    return "Company name must be at least 3 characters if provided.";
  return null;
};

export const validateWebsite = (website: string): string | null => {
  const websiteRegex = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;
  if (website && !websiteRegex.test(website)) return "Invalid URL format.";
  return null;
};
