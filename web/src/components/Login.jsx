import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { getUser } from "../redux/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(formData.email.trim())) {
      validationErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { data } = await axios.post(`${USER_API_POINT}/login`, formData, {
        withCredentials: true,
      });
      dispatch(getUser(data?.user))
      console.log(data?.user?.email)
      toast.success(`Welcom back ${data.user.fullName}`);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <div className="mb-8 animate-bounce">
            <label className="text-6xl font-bold"> EchoX </label>
          </div>
          <h1
            className="text-7xl font-bold text-white mb-6 opacity-0"
            style={{ animation: "fadeIn 1s ease-out forwards" }}
          >
            Welcome back
          </h1>
          <p
            className="text-3xl text-white/90 opacity-0"
            style={{ animation: "fadeIn 1s ease-out 0.3s forwards" }}
          >
            Log in to continue your journey
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-black">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md opacity-0"
          style={{ animation: "slideUp 0.6s ease-out forwards" }}
          noValidate
        >
          <div className="lg:hidden mb-8 text-center">
            <svg
              className="w-12 h-12 mx-auto text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>

          <h2 className="text-5xl font-bold text-white mb-3">
            Login in to EchoX
          </h2>
          <p className="text-gray-400 mb-10">
            Enter your credentials to access your account
          </p>

          <div className="space-y-5">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300" />
              <input
                type="email"
                name="email"
                placeholder="Email or username"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-transparent border-2 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 hover:border-gray-700 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-800 focus:border-blue-500"
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1  ">{errors.email}</p>
              )}
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors duration-300" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-transparent border-2 rounded-lg py-4 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 hover:border-gray-700 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-800 focus:border-blue-500"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute  cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-500   transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1  ">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-blue-500/50 mt-6"
              style={{ transform: "scale(1)", transition: "all 0.3s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.95)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
            >
              Log in
            </button>
          </div>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-800"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-800"></div>
          </div>

          <p className="text-center text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 cursor-pointer hover:text-blue-400 font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>

          <p className="text-center text-gray-600 text-xs mt-8 leading-relaxed">
            By continuing, you agree to X's{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
