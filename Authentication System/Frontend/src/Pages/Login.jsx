import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setserverError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setserverError("");

    try {
      const response = await axios.post(endpoints.login, {
        email: data.email,
        password: data.password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Login successful:", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data);

      if (error.response?.status === 404) {
        setserverError("User Not found. Register first.");
      } else if (error.response?.status === 401) {
        setserverError("Incorrect password. Try again");
      } else {
        setserverError("Internal server error");
      }
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen w-full bg-slate-700 px-4">
      <div className="form flex flex-col rounded-lg text-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl py-6 px-4 sm:px-8">
        
        <div className="text-2xl sm:text-3xl font-bold mt-4 flex justify-center">
          <h1>Login Here</h1>
        </div>

        <div className="create mt-3 text-base sm:text-lg flex justify-center text-gray-400 text-center">
          <p>You can login to your account</p>
        </div>

        {serverError && (
          <div className="text-red-400 text-center mt-4 text-sm sm:text-base font-semibold">
            {serverError}
          </div>
        )}

        <div className="inputsFields text-base sm:text-lg flex flex-col items-center mt-6 w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">

            <p className="w-full max-w-md text-left text-gray-500">Email</p>

            <input
              className="border-2 h-12 w-full max-w-md text-black border-black rounded-lg mt-2 pl-4"
              type="text"
              placeholder="Enter your email"
              {...register("email", {
                required: { value: true, message: "Field can't be empty" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
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
              className="border-2 h-12 w-full max-w-md text-black border-black rounded-lg mt-2 pl-4"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: { value: true, message: "Field can't be empty" },
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
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </div>

          </form>
        </div>

        <p className="text-blue-500 flex justify-center mt-5 cursor-pointer text-sm sm:text-base">
          <Link to="/register">New user? Register here</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
 

