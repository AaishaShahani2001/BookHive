import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="
      bg-[#4A3B34]/60 backdrop-blur-xl 
      border border-[#8B5E3C]/30 
      p-6 rounded-2xl 
      shadow-xl shadow-black/20
      flex flex-col items-center gap-6
    ">
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <img
          src={data.avatar}
          className="h-[80px] w-[80px] rounded-full object-cover border border-[#8B5E3C]/40 shadow"
        />
        <p className="mt-3 text-xl font-semibold text-[#F2E8D5]">{data.username}</p>
        <p className="text-sm text-[#D7C4A9]">{data.email}</p>
      </div>

      {/* Links */}
      <div className="w-full flex flex-col gap-2">
        {role === "user" && (
          <>
            <Link className="sidebarLink" to="/profile">Favourites</Link>
            <Link className="sidebarLink" to="/profile/orderHistory">Order History</Link>
            <Link className="sidebarLink" to="/profile/settings">Settings</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link className="sidebarLink" to="/profile/admin-dashboard">Dashboard</Link>
            <Link className="sidebarLink" to="/profile">All Orders</Link>
            <Link className="sidebarLink" to="/profile/add-book">Add Book</Link>
          </>
        )}
      </div>

      {/* Logout */}
      <button
        className="
          w-full py-2 rounded-lg bg-[#E85A4F] 
          hover:bg-red-600 transition text-white font-semibold
          flex items-center justify-center gap-2
        "
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear();
          history("/");
        }}
      >
        Logout <FaArrowRightFromBracket />
      </button>
    </div>
  );
};

export default Sidebar;
