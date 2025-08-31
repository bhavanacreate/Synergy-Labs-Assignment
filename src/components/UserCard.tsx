import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/userTypes";

interface UserCardProps {
  user: User;
  setUserToDelete: (user: any) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
}

export default function UserCard({
  user,
  setUserToDelete,
  setIsDeleteModalOpen,
}: UserCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      navigate(`/user-profile/${user.id}`);
    }
  };

  return (
    <div
      key={user.id}
      className="bg-white shadow rounded-lg p-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">{user.phone}</p>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-user/${user.id}`);
          }}
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            setUserToDelete(user);
            setIsDeleteModalOpen(true);
          }}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
