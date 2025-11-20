import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSnackbar } from "notistack";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      // EMPTY FIELD VALIDATION
      if (
        !Values.username.trim() ||
        !Values.email.trim() ||
        !Values.password.trim() ||
        !Values.address.trim()
      ) {
        enqueueSnackbar("All fields are required", { variant: "warning" });
        return;
      }

      // SIMPLE EMAIL CHECK
      if (!Values.email.includes("@")) {
        enqueueSnackbar("Enter a valid email", { variant: "warning" });
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/user/sign-up",
        Values
      );

      enqueueSnackbar(response.data.message, {
        variant: "success",
      });

      navigate("/Login");

    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Signup failed",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#3B2F2F] flex items-center justify-center px-6 py-10">

      {/* CARD */}
      <div className="
        bg-[#4A3B34]/70 
        backdrop-blur-xl 
        w-full md:w-3/6 lg:w-2/6 
        p-8 rounded-2xl 
        border border-[#8B5E3C]/30 
        shadow-xl shadow-black/40
      ">
        
        <p className="text-[#F2E8D5] text-3xl font-semibold drop-shadow mb-6">
          Create an Account
        </p>

        <div className="space-y-5">

          {/* USERNAME */}
          <div>
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
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[#D7C4A9] text-sm">Email</label>
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              value={Values.email}
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

          {/* PASSWORD */}
          <div>
            <label className="text-[#D7C4A9] text-sm">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
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

          {/* ADDRESS */}
          <div>
            <label className="text-[#D7C4A9] text-sm">Address</label>
            <textarea
              name="address"
              rows="4"
              placeholder="Enter your address"
              value={Values.address}
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

        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="
            w-full mt-6 py-3 rounded-lg 
            bg-[#8B5E3C] text-white font-semibold
            hover:bg-[#E85A4F] 
            transition-all shadow-md shadow-black/30
          "
          onClick={submit}
        >
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-[#D7C4A9] font-medium">
          Already have an account?{" "}
          <Link
            to="/Login"
            className="text-[#E85A4F] hover:text-[#FF8A80] transition"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
