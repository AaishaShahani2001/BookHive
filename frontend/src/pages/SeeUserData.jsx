import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* DARK BLUR OVERLAY */}
      <div
        className={`
          ${userDiv} 
          fixed inset-0 
          bg-black/60 
          backdrop-blur-sm 
          transition-all duration-300
        `}
        onClick={() => setuserDiv("hidden")}
      ></div>

      {/* CENTER MODAL */}
      <div
        className={`
          ${userDiv} 
          fixed inset-0 
          flex items-center justify-center
          transition-all duration-300
        `}
      >
        <div
          className="
            bg-[#4A3B34] 
            border border-[#8B5E3C]/40
            text-[#F2E8D5] 
            rounded-2xl 
            shadow-2xl 
            p-6 
            w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%]
            animate-fadeInScale
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-[#D7B899]/30 pb-3">
            <h1 className="text-2xl font-bold text-[#FFD9A8]">User Details</h1>
            <button
              onClick={() => setuserDiv("hidden")}
              className="text-2xl text-[#F2E8D5] hover:text-[#E85A4F] transition"
            >
              <RxCross1 />
            </button>
          </div>

          {/* USER INFO */}
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-lg text-[#D7C4A9]">Username</p>
              <p className="font-semibold text-xl text-[#F2E8D5]">
                {userDivData.username}
              </p>
            </div>

            <div>
              <p className="text-lg text-[#D7C4A9]">Email</p>
              <p className="font-semibold text-xl text-[#F2E8D5]">
                {userDivData.email}
              </p>
            </div>

            <div>
              <p className="text-lg text-[#D7C4A9]">Address</p>
              <p className="font-semibold text-xl text-[#F2E8D5] leading-relaxed">
                {userDivData.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        .animate-fadeInScale {
          animation: fadeInScale 0.25s ease-out;
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default SeeUserData;
