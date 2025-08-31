import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/userTypes";

interface UserTableProps {
  users: User[];
  setUserToDelete: (user: any) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}

export default function UserTable({
  users,
  setUserToDelete,
  setIsDeleteModalOpen,
}: UserTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (e: React.MouseEvent, userId: number) => {
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      navigate(`/user-profile/${userId}`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={(e) => handleRowClick(e, user.id)}
              className="cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => navigate(`/edit-user/${user.id}`)}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => {
                      setUserToDelete(user);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
