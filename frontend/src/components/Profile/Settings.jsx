import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useSnackbar } from "notistack";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://bookhive-backend-muz9.onrender.com/api/user/get-user-info",
          { headers }
        );

        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (err) {
        enqueueSnackbar("Failed to load user settings", {
          variant: "error",
        });
      }
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      if (!Value.address.trim()) {
        enqueueSnackbar("Address cannot be empty", { variant: "warning" });
        return;
      }

      const response = await axios.put(
        "https://bookhive-backend-muz9.onrender.com/api/user/update-address",
        Value,
        { headers }
      );

      enqueueSnackbar(response.data.message, {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to update address",
        { variant: "error" }
      );
    }
  };

  return (
    <>
      {!ProfileData && (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {ProfileData && (
        <div className="p-0 md:p-6 text-[#F2E8D5]">

          <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-[#F2E8D5] drop-shadow">
            Settings
          </h1>

          <div
            className="
              bg-[#4A3B34]/60 
              backdrop-blur-xl 
              p-8 rounded-2xl 
              border border-[#8B5E3C]/40 
              shadow-xl shadow-black/30
            "
          >
            {/* USER INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Username */}
              <div>
                <label className="text-[#D7C4A9] text-sm tracking-wide">
                  Username
                </label>
                <p
                  className="
                    mt-2 bg-[#3B2F2F]/60 border border-[#8B5E3C]/20 
                    p-3 rounded-lg text-lg font-semibold
                  "
                >
                  {ProfileData.username}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-[#D7C4A9] text-sm tracking-wide">
                  Email
                </label>
                <p
                  className="
                    mt-2 bg-[#3B2F2F]/60 border border-[#8B5E3C]/20 
                    p-3 rounded-lg text-lg font-semibold
                  "
                >
                  {ProfileData.email}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="mt-10">
              <label className="text-[#D7C4A9] text-sm tracking-wide">
                Address
              </label>
              <textarea
                name="address"
                value={Value.address}
                onChange={change}
                rows="5"
                className="
                  mt-2 w-full p-3 rounded-lg 
                  bg-[#3B2F2F]/60 border border-[#8B5E3C]/20
                  text-[#F2E8D5] placeholder-[#D7C4A9]/50
                  outline-none focus:border-[#E85A4F] 
                  transition
                "
              />
            </div>

            {/* UPDATE BUTTON */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={submitAddress}
                className="
                  bg-[#8B5E3C] hover:bg-[#E85A4F] 
                  text-white font-semibold px-6 py-2.5 
                  rounded-lg shadow-md shadow-black/30
                  transition-all
                "
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
