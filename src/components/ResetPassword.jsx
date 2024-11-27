import { useResetPasswordMutation } from "../redux/features/auth/authApi";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const [password, setPassword] = useState("");
  const [resetPassword, { isLoading, isSuccess, isError }] =
    useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword({ token, newPassword: password });
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl text-center font-semibold pt-5 mb-5 text-primary-dark">
          Forgot Password Page
        </h2>
        <form onSubmit={handleSubmit} action="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-100 focus:outline-none py-3 px-5  hover:bg-gray-200"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-primary text-white py-3 px-5 hover:bg-indigo-500 font-medium rounded-md"
          >
            Reset Password
          </button>
          {isSuccess && (
            <p className="text-center text-green-500">
              Password has been reset successfully!
            </p>
          )}
          {isError && (
            <p className="text-center text-red-500">
              Error resetting password. Try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
