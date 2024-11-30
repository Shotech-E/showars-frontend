import { useRequestPasswordResetMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [requestPasswordReset, { isLoading, isSuccess, isError }] =
    useRequestPasswordResetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestPasswordReset(email);
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl text-center font-semibold pt-5 mb-5 text-primary-dark">
          Forgot Password Page
        </h2>
        <form onSubmit={handleSubmit} action="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.Value.toLowerCase())}
            required
            className="w-full bg-gray-100 focus:outline-none py-3 px-5  hover:bg-gray-200"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-primary text-white py-3 px-5 hover:bg-indigo-500 font-medium rounded-md"
          >
            Send Reset Link
          </button>
          {isSuccess && <p className="text-center text-green-500">Check your email for a reset link!</p>}
          {isError && <p className="text-center text-red-500">Error sending reset link. Try again.</p>}
        </form>
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary px-1 underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center mt-1">
          Already Member?{" "}
          <Link to="/login" className="text-primary px-1 underline">
            Click Here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;