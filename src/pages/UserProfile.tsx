import  { useState, useEffect } from "react";
import { fetchUserDetails } from "../services/FetchUserDetails";
import { User } from "../types/userTypes";
import Loader from "../components/Loader";
import ToastNotification from "../components/ToastNotification";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState({ message: "", visible: false, type: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserDetails(Number(id));
        setUser(userData);
        setToast({
          message: "User profile loaded successfully!",
          visible: true,
          type: "success",
        });
        setTimeout(() => {
          setToast({ message: "", visible: false, type: "" });
        }, 3000);
      } catch (err) {
        setError("Failed to load user profile");
        setToast({
          message: "Failed to load user profile",
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
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error || "User not found"}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-white">
            {user.name}'s Profile
          </h1>
          <p className="mt-1 text-sm text-indigo-200">@{user.username}</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact Information
              </h2>
              <dl className="mt-2 text-sm text-gray-500">
                <div className="mt-1">
                  <dt className="font-medium">Email</dt>
                  <dd>{user.email}</dd>
                </div>
                <div className="mt-1">
                  <dt className="font-medium">Phone</dt>
                  <dd>{user.phone}</dd>
                </div>
                <div className="mt-1">
                  <dt className="font-medium">Website</dt>
                  <dd>
                    <a
                      href={`https://${user.website}`}
                      className="text-indigo-600 hover:text-indigo-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Address</h2>
              <address className="mt-2 not-italic text-sm text-gray-500">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </address>
              <div className="mt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on map
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Company</h2>
            <dl className="mt-2 text-sm text-gray-500">
              <div>
                <dt className="font-medium">Name</dt>
                <dd>{user.company.name}</dd>
              </div>
              <div className="mt-1">
                <dt className="font-medium">Catch Phrase</dt>
                <dd className="italic">"{user.company.catchPhrase}"</dd>
              </div>
              <div className="mt-1">
                <dt className="font-medium">BS</dt>
                <dd>{user.company.bs}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <ToastNotification toast={toast} />
    </div>
  );
}
