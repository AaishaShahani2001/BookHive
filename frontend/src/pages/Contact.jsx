import React from "react";
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuHeadphones,
  LuClock,
  LuMessageCircle,
} from "react-icons/lu";

const accent = "#8B5E3C"; // Coffee Brown

const IconWrap = ({ children }) => (
  <div
    className="w-14 h-14 rounded-2xl grid place-items-center mx-auto shadow-lg"
    style={{
      background: "#4A3B34",
      border: "1px solid rgba(139,94,60,0.4)",
    }}
  >
    <div className="text-3xl" style={{ color: accent }}>
      {children}
    </div>
  </div>
);

export default function ContactUs() {
  return (
    <div className="bg-[#3B2F2F] min-h-screen text-[#F2E8D5]">
      {/* Hero */}
      <section className="relative bg-[#3B2F2F] text-[#F2E8D5] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#D7C4A9]">
            Contact BookHive
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-[#F2E8D5]/80">
            Questions about inventory, orders, or bookstore operations?  
            We're here to help—reach us through any method below.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-[#4A3B34]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D7C4A9]">
              Contact Information
            </h2>
            <p className="text-xl text-[#F2E8D5]/70">
              Choose the best way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Address */}
            <div className="rounded-2xl p-8 bg-[#3B2F2F] border border-[#8B5E3C]/20 shadow hover:shadow-xl transition-all text-center">
              <IconWrap><LuMapPin /></IconWrap>
              <h3 className="mt-6 text-xl font-semibold text-[#F2E8D5]">Visit Us</h3>
              <p className="mt-4 text-[#D7C4A9] leading-relaxed">
                221B Reading Lane<br />
                Colombo 07, Sri Lanka<br />
                <span className="text-sm opacity-75">Near Independence Square</span>
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl p-8 bg-[#3B2F2F] border border-[#8B5E3C]/20 shadow hover:shadow-xl transition-all text-center">
              <IconWrap><LuPhone /></IconWrap>
              <h3 className="mt-6 text-xl font-semibold text-[#F2E8D5]">Call Us</h3>
              <div className="mt-4 space-y-2 text-[#D7C4A9]">
                <a href="tel:+94712345678" className="block hover:text-[#E85A4F]">
                  +94 71 234 5678
                </a>
                <a href="tel:+94112345678" className="block hover:text-[#E85A4F]">
                  +94 11 234 5678
                </a>
                <p className="text-sm opacity-75 mt-2">Mon–Sat: 8 AM – 8 PM</p>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-2xl p-8 bg-[#3B2F2F] border border-[#8B5E3C]/20 shadow hover:shadow-xl transition-all text-center">
              <IconWrap><LuMail /></IconWrap>
              <h3 className="mt-6 text-xl font-semibold text-[#F2E8D5]">Email Us</h3>
              <div className="mt-4 space-y-2 text-[#D7C4A9]">
                <a href="mailto:support@bookhive.lk" className="block hover:text-[#E85A4F]">
                  support@bookhive.lk
                </a>
                <a href="mailto:info@bookhive.lk" className="block hover:text-[#E85A4F]">
                  info@bookhive.lk
                </a>
                <p className="text-sm opacity-75 mt-2">We reply within 24 hours</p>
              </div>
            </div>

            {/* Customer Care */}
            <div className="rounded-2xl p-8 bg-[#3B2F2F] border border-[#8B5E3C]/20 shadow hover:shadow-xl transition-all text-center">
              <IconWrap><LuHeadphones /></IconWrap>
              <h3 className="mt-6 text-xl font-semibold text-[#F2E8D5]">Customer Care</h3>
              <p className="mt-4 text-[#D7C4A9]">
                Available: 8 AM – 8 PM (Mon–Sat)<br />
                <span className="font-semibold text-[#E85A4F]">
                  Chat Support: 24/7
                </span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-[#3B2F2F]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#D7C4A9]">Business Hours</h2>
            <p className="text-xl text-[#F2E8D5]/75">We’re open when you need us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                icon: <LuClock className="w-8 h-8" style={{ color: accent }} />,
                title: "Head Office",
                hours: [
                  "Mon–Fri: 8:00 AM – 6:00 PM",
                  "Saturday: 9:00 AM – 4:00 PM",
                  "Sunday: Closed",
                ],
              },
              {
                icon: <LuPhone className="w-8 h-8" style={{ color: accent }} />,
                title: "Phone Support",
                hours: [
                  "Mon–Sat: 8:00 AM – 8:00 PM",
                  "Sunday: 10:00 AM – 4:00 PM",
                  "Emergency: 24/7 Available",
                ],
              },
              {
                icon: <LuMessageCircle className="w-8 h-8" style={{ color: accent }} />,
                title: "Online Support",
                hours: [
                  "Live Chat: 24/7",
                  "Email: Within 24 hours",
                  "Community: Always active",
                ],
              },
            ].map((box, i) => (
              <div
                key={i}
                className="bg-[#4A3B34] p-8 rounded-2xl text-center border border-[#8B5E3C]/20 shadow-xl"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#3B2F2F] border border-[#8B5E3C]/30">
                  {box.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[#F2E8D5] mb-4">{box.title}</h3>
                <div className="space-y-2 text-[#D7C4A9]">
                  {box.hours.map((h, idx) => (
                    <p key={idx}>{h}</p>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Social / Community */}
      <section className="py-20 bg-[#8B5E3C] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Reader Community</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Follow us for book drops, staff picks, and reading events.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {[
              { icon: "📘", title: "Facebook", tag: "@BookHiveSL" },
              { icon: "📷", title: "Instagram", tag: "@bookhive_sl" },
              { icon: "🐦", title: "Twitter", tag: "@BookHiveSL" },
              { icon: "💬", title: "WhatsApp", tag: "+94 71 234 5678" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="opacity-90 text-sm">{item.tag}</p>
              </div>
            ))}

          </div>

        </div>
      </section>
    </div>
  );
}
