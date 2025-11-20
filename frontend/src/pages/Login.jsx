import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (!Values.username.trim() || !Values.password.trim()) {
        enqueueSnackbar("All fields are required", { variant: "warning" });
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/user/sign-in",
        Values
      );

      // redux
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      // localStorage
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/profile");

    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Login failed",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="h-screen bg-[#3B2F2F] flex items-center justify-center px-6">
      <div className="
        bg-[#4A3B34]/70 
        backdrop-blur-xl 
        w-full md:w-3/6 lg:w-2/6 
        p-8 rounded-2xl 
        border border-[#8B5E3C]/30 
        shadow-xl shadow-black/30
      ">
        
        <p className="text-[#F2E8D5] text-3xl font-semibold drop-shadow mb-6">
          Login
        </p>

        <div className="mt-2">
          {/* USERNAME */}
          <label className="text-[#D7C4A9] text-sm">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={Values.username}
            onChange={change}
            className="
              w-full mt-2 p-3 rounded-lg 
              bg-[#3B2F2F]/60 
              border border-[#8B5E3C]/30 
              text-[#F2E8D5] placeholder-[#D7C4A9]/60 
              outline-none
              focus:border-[#E85A4F] 
              transition
            "
          />

          {/* PASSWORD */}
          <div className="mt-4">
            <label className="text-[#D7C4A9] text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={Values.password}
              onChange={change}
              className="
                w-full mt-2 p-3 rounded-lg 
                bg-[#3B2F2F]/60 
                border border-[#8B5E3C]/30 
                text-[#F2E8D5] placeholder-[#D7C4A9]/60 
                outline-none
                focus:border-[#E85A4F] 
                transition
              "
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={submit}
            className="
              w-full mt-6 py-3 font-semibold text-white rounded-lg 
              bg-[#8B5E3C] hover:bg-[#E85A4F] 
              transition-all shadow-md shadow-black/30
            "
          >
            Log In
          </button>

          {/* SEPARATOR */}
          <p className="flex mt-6 items-center justify-center text-[#F2E8D5]/80">
            — Or —
          </p>

          {/* SIGNUP LINK */}
          <p className="flex mt-4 items-center justify-center text-[#D7C4A9]">
            Don't have an account? &nbsp;
            <Link 
              to="/SignUp" 
              className="text-[#E85A4F] hover:text-[#FF8A80] transition"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
