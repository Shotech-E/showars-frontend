import { useDispatch, useSelector } from "react-redux";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import avatarImg from "../../../assets/avatar.png";
import { setUser } from "../../../redux/features/auth/authSlice";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    bio: "",
    profession: "",
    userId: "",
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isLoading, isError, error, isSuccess }] =
    useEditProfileMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        email: user?.email || "",
        profileImage: user?.profileImage || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        userId: user?._id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: formData.username,
      // email: formData.email,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      userId: formData.userId,
    };
    try {
      const response = await editProfile(updatedUser).unwrap();
      console.log(response);
      dispatch(setUser(response.user));
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again");
    }

    setIsModalOpen(false);
  };
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src={formData?.profileImage || avatarImg}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-medium">
              <span className="text-blue-800 font-semibold">Username:</span> {formData?.username || "N/A"}
            </h3>
            <p className="text-gray-700">
              <span className="text-blue-500 font-semibold">Email:</span>{" "}
              {formData?.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="text-blue-500 font-semibold">Profession:</span>{" "}
              {formData?.profession || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="text-blue-500 font-semibold">User Bio:</span>{" "}
              {formData?.bio || "N/A"}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-800"
          >
            <i className="ri-edit-box-line"></i>
          </button>
        </div>
      </div>
      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 bg-black opacity-50"></div>
      )}
      {isModalOpen && (
        <div className="fixed z-20 inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            {/* <h3 className="text-lg font-medium mb-4">Edit Profile</h3> */}
            {/* <button className="absolute top-2 right-2 ">
              <i className="ri-close-circle-fill"></i>
            </button> */}
            <div className="bg-white p-2 rounded-lg md:w-96 max-w-xl mx-auto relative">
              <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 "
              >
                <i className="ri-close-circle-fill"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  value={formData?.username}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profileImage"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Profile Image Url
                </label>
                <input
                  type="text"
                  id="profileImage"
                  name="profileImage"
                  placeholder="Enter profile image URL"
                  value={formData?.profileImage}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bio"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Enter your bio"
                  value={formData?.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded-lg"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profession"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  placeholder="Enter your profession"
                  value={formData?.profession}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-2 rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
                {isError && (
                  <p className="mt-2 text-red-500">
                    Failed to update profile. Please try again.
                  </p>
                )}
                {isSuccess && (
                  <p className="mt-2 text-green-500">
                    Profile updated successfully.
                  </p>
                )}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
