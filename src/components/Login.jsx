/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    // 
    try {
      const response = await loginUser(data).unwrap();
      // console.log(response);
      const { token, user } = response;
      dispatch(setUser ({ user }));
      setMessage("Login successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide email and password");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl text-center font-semibold pt-5 mb-5 text-primary-dark">
          Login Page
        </h2>
        <form onSubmit={handleLogin} action="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none py-3 px-5  hover:bg-gray-200"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-gray-100 focus:outline-none py-3 px-5 hover:bg-gray-200"
          />
          {message && <p className="text-red-500">{message}</p>}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white py-3 px-5 hover:bg-indigo-500 font-medium rounded-md"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary px-1 underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center mt-1">
          Forgotten Password?{" "}
          <Link to="/forgot-password" className="text-primary px-1 underline">
            Click Here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
