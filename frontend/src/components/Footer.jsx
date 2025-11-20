import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiGithub, FiMail } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3B2F2F] text-[#F2E8D5] border-t border-[#8B5E3C]/40 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
              alt="BookHive logo"
              className="h-10 w-10 drop-shadow"
            />
            <span className="text-2xl font-bold text-[#FFD9A8]">
              BookHive
            </span>
          </div>

          <p className="mt-4 text-[#F2E8D5]/80 leading-relaxed">
            Cozy ambiance. Curated reads.  
            Discover books the café way ☕📚.
          </p>

          <div className="mt-5 flex gap-4">
            {[FiFacebook, FiInstagram, FiTwitter, FiGithub].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="
                  p-2 rounded-md border border-[#8B5E3C]/40 
                  hover:bg-[#E85A4F] hover:text-white 
                  transition-all duration-300
                "
              >
                <Icon className="text-xl" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD9A8]">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-[#F2E8D5]/90">
            <li><Link to="/" className="hover:text-[#E85A4F] transition">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-[#E85A4F] transition">About Us</Link></li>
            <li><Link to="/all-books" className="hover:text-[#E85A4F] transition">All Books</Link></li>
            <li><Link to="/cart" className="hover:text-[#E85A4F] transition">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-[#E85A4F] transition">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD9A8]">Resources</h3>
          <ul className="mt-4 space-y-2 text-[#F2E8D5]/90">
            <li><Link to="/faq" className="hover:text-[#E85A4F] transition">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-[#E85A4F] transition">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-[#E85A4F] transition">Shipping</Link></li>
            <li><Link to="/privacy" className="hover:text-[#E85A4F] transition">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-[#E85A4F] transition">Terms</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD9A8]">Stay Updated</h3>
          <p className="mt-4 text-[#F2E8D5]/80">Weekly picks, offers & new arrivals.</p>

          <form className="mt-4 flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFD9A8]/60" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="
                  w-full rounded-lg bg-[#4A3B34] border border-[#8B5E3C]/40 
                  pl-10 pr-3 py-3 text-sm 
                  placeholder-[#F2E8D5]/50
                  text-[#F2E8D5]
                  focus:outline-none focus:ring-2 focus:ring-[#E85A4F]
                "
              />
            </div>

            <button
              type="submit"
              className="
                px-5 py-3 rounded-lg bg-[#E85A4F] 
                text-white font-medium shadow-sm
                hover:bg-[#8B5E3C] transition-all duration-300
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-[#8B5E3C]/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between text-[#F2E8D5]/70 text-sm">
          <p>© {year} Aaisha Shahani • BookHive</p>
          <p>Crafted with ☕ & ❤️ for book lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
