/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const Register = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
    console.log(data);
    try {
      await registerUser(data).unwrap();
      // console.log(response);
      alert("Register successful");
      navigate("/login");
    } catch (error) {
      setMessage("Registration fail");
    }

  };

  return (
    <>
      <Navbar />
      <section className="h-screen flex items-center justify-center">
        <div className="max-w-sm border shadow bg-white mx-auto p-8">
          <h2 className="text-2xl text-center font-semibold pt-5 mb-5 text-primary-dark">
            Register Page
          </h2>
          <form
            onSubmit={handleRegister}
            action="space-y-5 max-w-sm mx-auto pt-8"
          >
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full bg-gray-100 focus:outline-none py-3 px-5  hover:bg-gray-200"
            />
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
              Register
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-primary px-1 underline">
              Login
            </Link>
            Here
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
