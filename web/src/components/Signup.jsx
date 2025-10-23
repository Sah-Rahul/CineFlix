import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("✅ Form Submitted:", formData);
    alert("Signup successful!");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <div className="mb-8 animate-bounce">
            <label className="text-6xl font-bold text-white">EchoX</label>
          </div>
          <h1
            className="text-6xl font-bold text-white mb-4 opacity-0"
            style={{ animation: "fadeIn 1s ease-out forwards" }}
          >
            Happening now
          </h1>
          <p
            className="text-2xl text-white/90 opacity-0"
            style={{ animation: "fadeIn 1s ease-out 0.3s forwards" }}
          >
            Join today.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-black">
        <div
          className="w-full max-w-md opacity-0"
          style={{ animation: "slideUp 0.6s ease-out forwards" }}
        >
          <div className="lg:hidden mb-8 text-center">
            <label className="text-6xl font-bold text-white">EchoX</label>
          </div>

          <h2 className="text-4xl font-bold text-white mb-2">
            Create your account
          </h2>
          <p className="text-gray-400 mb-8">Start your journey with EchoX</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-transparent border-2 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-800 focus:border-blue-500 hover:border-gray-700"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-transparent border-2 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-800 focus:border-blue-500 hover:border-gray-700"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-transparent border-2 rounded-lg py-4 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all duration-300 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-800 focus:border-blue-500 hover:border-gray-700"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              Sign up
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-800"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-800"></div>
          </div>

          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Signup;
