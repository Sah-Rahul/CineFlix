import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 5) {
      newErrors.fullName = "Full name must be at least 5 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        { withCredentials: true }
      );

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1670002252579-369f180c17e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZlbmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 bg-[#00000080] p-8 md:p-16 rounded-lg w-full max-w-md mx-4">
        <h2 className="text-white text-3xl font-bold mb-8">Sign Up</h2>

        <div className="space-y-6">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded border ${
                errors.fullName ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-white transition`}
              required
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or phone number"
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-white transition`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-4 py-3 bg-gray-700 text-white rounded border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } focus:outline-none focus:border-white transition`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 cursor-pointer text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-8 text-gray-400">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>

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
