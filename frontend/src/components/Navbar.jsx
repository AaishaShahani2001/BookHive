import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const [mobileNav, setMobileNav] = useState(false);

  const commonLinks = [
    { title: 'Home', link: '/' },
    { title: 'AboutUs', link: '/about-us' },
    { title: 'Contact', link: '/contact' },
    { title: 'All Books', link: '/all-books' },
  ];

  const userLinks = [
    { title: 'Cart', link: '/cart' }, 
    { title: 'Profile', link: '/profile' }
  ];
  
  const adminLinks = [
    { title: 'Cart', link: '/cart' }, 
    { title: 'Admin Profile', link: '/profile/admin-dashboard' }
  ];

  let visibleLinks = [...commonLinks];
  if (isLoggedIn && role === 'user') visibleLinks = [...visibleLinks, ...userLinks];
  if (isLoggedIn && role === 'admin') visibleLinks = [...visibleLinks, ...adminLinks];

  const renderLink = (item) => {
    const isPrimary = item.title === 'Profile' || item.title === 'Admin Profile';

    return (
      <Link
        key={item.title}
        to={item.link}
        className={
          isPrimary
            ? "px-4 py-1 font-semibold bg-[#8B5E3C] text-[#F2E8D5] rounded hover:bg-[#E85A4F] transition-all duration-300"
            : "text-[#F2E8D5] hover:text-[#E85A4F] transition-all duration-300"
        }
      >
        {item.title}
      </Link>
    );
  };

  return (
    <>
      <nav className="z-50 relative flex bg-[#3B2F2F] text-[#F2E8D5] px-8 py-4 items-center justify-between shadow-md shadow-black/20">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-bold text-[#D7C4A9]">BookHive</h1>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 items-center">
          {visibleLinks.map(renderLink)}
        </div>

        {/* Desktop auth */}
        {!isLoggedIn && (
          <div className="hidden md:flex gap-4">
            <Link
              to="/Login"
              className="px-4 py-1 border border-[#D7C4A9] rounded text-[#F2E8D5] hover:bg-[#8B5E3C] transition-all"
            >
              Login
            </Link>

            <Link
              to="/SignUp"
              className="px-4 py-1 bg-[#E85A4F] text-white rounded hover:bg-[#8B5E3C] transition-all"
            >
              SignUp
            </Link>
          </div>
        )}

        {/* Mobile menu */}
        <button
          className="block md:hidden text-[#F2E8D5] text-2xl hover:text-[#E85A4F]"
          onClick={() => setMobileNav((s) => !s)}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {mobileNav && (
        <div className="bg-[#3B2F2F] h-screen fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center">

          {visibleLinks.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              onClick={() => setMobileNav(false)}
              className="text-[#F2E8D5] text-4xl mb-4 font-semibold hover:text-[#E85A4F] transition-all"
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <>
              <Link
                to="/Login"
                onClick={() => setMobileNav(false)}
                className="px-8 py-2 mb-7 text-3xl font-semibold border border-[#D7C4A9] text-[#F2E8D5] rounded hover:bg-[#8B5E3C]"
              >
                Login
              </Link>

              <Link
                to="/SignUp"
                onClick={() => setMobileNav(false)}
                className="px-8 py-2 text-3xl font-semibold bg-[#E85A4F] text-white rounded hover:bg-[#8B5E3C]"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
