import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../services/FetchUserDetails";
import { editUser } from "../services/EditUser";
import { User } from "../types/userTypes";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateAddress,
  validateCompanyName,
  validateWebsite,
} from "../utils/FormValidation"; 
import Loader from "../components/Loader";
import ToastNotification from "../components/ToastNotification";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", visible: false, type: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    website: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserDetails(Number(id));
        setUser(userData);
      } catch (error) {
        setToast({
          message: "Failed to load user data",
          visible: true,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Check if the name has a dot (for nested properties)
    if (name.includes('.')) {
        const keys = name.split('.');
        const mainKey = keys[0] as keyof User;

        // Ensure the mainKey corresponds to an object type
        setUser((prevUser) => {
            if (prevUser) {
                return {
                    ...prevUser,
                    [mainKey]: {
                        ...(prevUser[mainKey] as Record<string, any>), // Type assertion to ensure it's treated as an object
                        [keys[1]]: value,
                    },
                };
            }
            return prevUser; // Return the previous state if prevUser is null or undefined
        });
    } else {
        setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : prevUser));
    }
};


  // Form validation
  const validateForm = () => {
    const newErrors = {
        name: validateName(user?.name || "") || "",
        email: validateEmail(user?.email || "") || "",
        phone: validatePhone(user?.phone || "") || "",
        address: user?.address ? validateAddress(user.address) : "Address is required.", // Check if address is defined
        companyName: validateCompanyName(user?.company.name || "") || "",
        website: validateWebsite(user?.website || "") || "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (user) {
      try {
        await editUser(Number(id), user); 
        setToast({
          message: "User updated successfully!",
          visible: true,
          type: "success",
        });
        navigate(`/user-profile/${id}`); 
      } catch (error) {
        setToast({
          message: "Failed to update user",
          visible: true,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold mb-6">Edit User</h1>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user?.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user?.username}
                disabled // Username should remain the same
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user?.phone}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Website Field */}
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={user?.website}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.website && (
                <p className="text-red-500 text-sm">{errors.website}</p>
              )}
            </div>

            {/* Address Fields */}
            <h2 className="text-lg font-medium text-gray-900 mb-2">Address</h2>
            <div className="mb-4">
              <label
                htmlFor="address.street"
                className="block text-sm font-medium text-gray-700"
              >
                Street
              </label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={user?.address.street}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="address.city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={user?.address.city}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address.zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Zipcode
              </label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={user?.address.zipcode}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
      <ToastNotification toast={toast} />
    </div>
  );
}
