/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgottenPassword = () => {



  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl text-center font-semibold pt-5 mb-5 text-primary-dark">
          Forgot Password
        </h2>
        <form action="space-y-5 max-w-sm mx-auto pt-8" autoComplete="off">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none py-3 px-5  hover:bg-gray-200"
          />

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white py-3 px-5 hover:bg-indigo-500 font-medium rounded-md"
          >
            Submit
          </button>
        </form>
        <p className="text-center mt-3">
          Login {" "}
          <Link to="/login" className="text-primary px-1 underline">
            Click Here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgottenPassword;
