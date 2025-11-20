import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import MobileNav from '../components/Profile/MobileNav.jsx';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/get-user-info",
          { headers }
        );
        setProfile(response.data);
      } catch (err) {
        console.error("get-user-info failed:", err?.response?.status, err?.response?.data);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-[#3B2F2F] min-h-screen w-full px-4 md:px-10 py-10 text-white">

      {!profile && (
        <div className="w-full flex justify-center items-center h-[50vh]">
          <Loader />
        </div>
      )}

      {profile && (
        <div className="flex flex-col md:flex-row gap-8">

          {/* SIDEBAR (Auto height, sticky, compact) */}
          <div className="w-full md:w-[23%]">
            <div className="sticky top-6">
              <Sidebar data={profile} />
            </div>
            <MobileNav />
          </div>

          {/* RIGHT CONTENT */}
          <div className="
            w-full md:w-[77%] 
            bg-[#4A3B34]/40 p-6 
            rounded-xl border border-[#8B5E3C]/20 
            shadow-lg backdrop-blur-lg
          ">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
