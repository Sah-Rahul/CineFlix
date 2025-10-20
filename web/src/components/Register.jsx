import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Yahan aap API call kar sakte ho
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src=" https://plus.unsplash.com/premium_photo-1670002252579-369f180c17e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZlbmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Register Form */}
      <div className="relative z-10 bg-[#00000080] p-8 md:p-16 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-white text-3xl font-bold mb-8">Sign Up</h2>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email or phone number"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white transition"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 cursor-pointer text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-gray-400">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline font-semibold"
            >
              {" "}
               Login In
            </Link>
          </p>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-400 mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Learn more
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
