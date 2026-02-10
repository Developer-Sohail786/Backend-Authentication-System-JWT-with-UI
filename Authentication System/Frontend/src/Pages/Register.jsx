import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(endpoints.register, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error response:", error.response?.data);
      alert(error.response?.data?.message || "Internal server error");
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen bg-slate-700 px-4">
      <div className="form flex flex-col rounded-lg text-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl py-6 px-4 sm:px-8">

        <div className="text-2xl sm:text-3xl font-bold mt-4 flex justify-center">
          <h1>Register Here</h1>
        </div>

        <div className="create mt-3 text-base sm:text-lg flex justify-center text-gray-400 text-center">
          <p>Create your new account here</p>
        </div>

        <div className="inputsFields text-base sm:text-lg flex flex-col items-center mt-8 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">

            <p className="w-full max-w-md text-left text-gray-500">Name</p>

            <input
              type="text"
              placeholder="Enter your name"
              className="border-2 h-12 w-full max-w-md text-black border-black rounded-lg mt-2 pl-4"
              {...registerField("name", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 3, message: "Minimum length is 3 characters" },
                maxLength: { value: 20, message: "Maximum length is 20 characters" },
              })}
            />

            {errors.name && (
              <div className="text-red-500 text-sm mt-1 w-full max-w-md">
                {errors.name.message}
              </div>
            )}

            <p className="w-full max-w-md text-left text-gray-500 mt-4">
              Email
            </p>

            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 h-12 w-full max-w-md text-black border-black rounded-lg mt-2 pl-4"
              {...registerField("email", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 6, message: "Minimum length is 6 characters" },
                maxLength: { value: 24, message: "Maximum length is 24 characters" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email Invalid",
                },
              })}
            />

            {errors.email && (
              <div className="text-red-500 text-sm mt-1 w-full max-w-md">
                {errors.email.message}
              </div>
            )}

            <p className="w-full max-w-md text-left text-gray-500 mt-5">
              Password
            </p>

            <input
              type="password"
              placeholder="Enter your password"
              className="border-2 h-12 w-full max-w-md text-black border-black rounded-lg mt-2 pl-4"
              {...registerField("password", {
                required: { value: true, message: "Field can't be empty" },
                minLength: { value: 8, message: "Minimum length is 8 characters" },
                maxLength: { value: 16, message: "Maximum length is 16 characters" },
                validate: (value) => {
                  if (!/[a-z]/.test(value)) return "Lowercase character is required";
                  if (!/[A-Z]/.test(value)) return "Uppercase character is required";
                  if (!/\d/.test(value)) return "Number is required";
                  if (!/[@$!%*?&]/.test(value)) return "Special character is required (@$!%*?&)";
                  return true;
                },
              })}
            />

            {errors.password && (
              <div className="text-red-500 text-sm mt-1 w-full max-w-md">
                {errors.password.message}
              </div>
            )}

            <div className="btn flex justify-center w-full max-w-md">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-12 w-full sm:w-[60%] rounded-lg mt-5 font-bold text-base sm:text-lg ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-blue-500 hover:bg-blue-800 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>

          </form>
        </div>

        <p className="text-gray-400 flex justify-center mt-5 text-sm sm:text-base text-center">
          Already had an account?
          <Link to="/login" className="text-blue-500 ml-2 hover:underline cursor-pointer">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;


