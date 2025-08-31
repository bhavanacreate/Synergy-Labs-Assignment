import { useState } from "react";
import { createUser } from "../services/CreateUser";
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
import { useNavigate } from "react-router-dom";

export default function CreateUserForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false, type: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    website: "",
  });

  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    username: `USER-${Math.random().toString(36).substring(2, 7)}`,
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const navigate = useNavigate();
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
                        ...(prevUser[mainKey] as Record<string, any>), // Ensure it’s treated as an object
                        [keys[1]]: value,
                    },
                };
            }
            return prevUser;
        });
    } else {
        setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : prevUser));
    }
};


  // Form validation
  const validateForm = () => {
    const newErrors = {
      name: validateName(user.name) || "",
      email: validateEmail(user.email) || "",
      phone: validatePhone(user.phone) || "",
      address: validateAddress(user.address) || "",
      companyName: validateCompanyName(user.company.name) || "",
      website: validateWebsite(user.website) || "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await createUser(user);
      setToast({
        message: "User created successfully!",
        visible: true,
        type: "success",
      });
      setTimeout(() => {
        setToast({ message: "", visible: false, type: "" });
        navigate("/");
      }, 3000);
    } catch (error) {
      setToast({
        message: "Failed to create user.",
        visible: true,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create New User</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address Section */}
        <h3 className="text-xl font-semibold mt-6 mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Street
            </label>
            <input
              id="street"
              name="address.street"
              type="text"
              value={user.address.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              id="city"
              name="address.city"
              type="text"
              value={user.address.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Zipcode
            </label>
            <input
              id="zipcode"
              name="address.zipcode"
              type="text"
              value={user.address.zipcode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>

        {/* Company Section */}
        <h3 className="text-xl font-semibold mt-6 mb-4">Company</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Company Name
            </label>
            <input
              id="companyName"
              name="company.name"
              type="text"
              value={user.company.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="catchPhrase"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Catch Phrase
            </label>
            <input
              id="catchPhrase"
              name="company.catchPhrase"
              type="text"
              value={user.company.catchPhrase}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="bs"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              BS
            </label>
            <textarea
              id="bs"
              name="company.bs"
              value={user.company.bs}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-6 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          Create User
        </button>
      </form>

      <ToastNotification toast={toast} />
    </>
  );
}
