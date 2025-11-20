import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {(role === "user" || role === "admin") && (
        <div className="
          w-full lg:hidden flex items-center justify-between 
          bg-[#4A3B34]/70 backdrop-blur-xl
          border border-[#8B5E3C]/30 
          rounded-xl p-3 mt-4
          shadow-md text-[#F2E8D5]
        ">
          {role === "user" && (
            <>
              <Link className="mobileLink" to="/profile">Favourites</Link>
              <Link className="mobileLink" to="/profile/orderHistory">Orders</Link>
              <Link className="mobileLink" to="/profile/settings">Settings</Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link className="sidebarLink" to="/profile/admin-dashboard">Dashboard</Link>
              <Link className="mobileLink" to="/profile">All Orders</Link>
              <Link className="mobileLink" to="/profile/add-book">Add Book</Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNav;
