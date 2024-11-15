/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../../redux/features/auth/authApi";

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);

  const [updateUserRole] = useUpdateUserRoleMutation();
  const handleUpdateRole = async () => {
    try {
      await updateUserRole({ userId: user?._id, role }).unwrap();
      alert("Updated role successfully!");
      onRoleUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Edit User Role</h2>
        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
          />
        </div>
        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateRole}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserModal;