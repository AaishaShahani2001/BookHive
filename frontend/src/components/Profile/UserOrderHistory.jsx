import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookhive-backend-muz9.onrender.com/api/order/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="text-[#F2E8D5] w-full">
      {/* LOADING */}
      {!orderHistory && (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* EMPTY STATE */}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-semibold text-[#D7C4A9] mb-6">
            No Orders Yet
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="no orders"
            className="h-[25vh] opacity-80"
          />
          <p className="mt-4 text-[#D7C4A9]/80">
            Once you order a book, it will appear here.
          </p>
        </div>
      )}

      {/* ORDER HISTORY */}
      {orderHistory && orderHistory.length > 0 && (
        <div className="p-0 md:p-4">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 drop-shadow">
            Your Order History
          </h1>

          {/* TABLE HEADER */}
          <div
            className="
              bg-[#4A3B34]/70 
              border border-[#8B5E3C]/40 
              backdrop-blur-xl rounded-xl 
              py-3 px-4 flex gap-2 text-[#D7C4A9] 
              shadow-md
            "
          >
            <div className="w-[4%] text-center font-semibold">#</div>
            <div className="w-[22%] font-semibold">Book</div>
            <div className="w-[40%] font-semibold">Description</div>
            <div className="w-[10%] font-semibold">Price</div>
            <div className="w-[14%] font-semibold">Status</div>
            <div className="hidden md:block w-[10%] font-semibold">Mode</div>
          </div>

          {/* ORDER ROWS */}
          <div className="mt-3 space-y-3">
            {orderHistory.map((items, i) => (
              <div
                key={items._id}
                className="
                  bg-[#4A3B34]/40 
                  border border-[#8B5E3C]/20 
                  rounded-xl py-3 px-4 flex gap-4 
                  items-center 
                  hover:bg-[#4A3B34]/60 
                  transition-all shadow-sm cursor-pointer
                "
              >
                {/* Index */}
                <div className="w-[4%] text-center text-lg opacity-90">
                  {i + 1}
                </div>

                {/* Book Title */}
                <div className="w-[22%]">
                  {items.book ? (
                    <Link
                      to={`/view-book-details/${items.book._id}`}
                      className="text-[#E8DCC5] hover:text-[#E85A4F] transition-all font-medium"
                    >
                      {items.book.title}
                    </Link>
                  ) : (
                    <span className="text-red-400 font-medium">Book Deleted</span>
                  )}
                </div>

                {/* Description */}
                <div className="w-[40%] text-[#D7C4A9]/80">
                  {items.book?.desc?.slice(0, 60) || "No description"}...
                </div>

                {/* Price */}
                <div className="w-[10%] font-semibold text-[#F2E8D5]">
                  Rs. {items.book?.price || "N/A"}
                </div>

                {/* Status Badge */}
                <div className="w-[14%]">
                  {items.status === "Order Placed" && (
                    <span className="px-3 py-1 rounded-full bg-yellow-600/30 text-yellow-300 text-sm">
                      {items.status}
                    </span>
                  )}
                  {items.status === "Canceled" && (
                    <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-sm">
                      {items.status}
                    </span>
                  )}
                  {items.status === "Out for Delivery" && (
                    <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-sm">
                      {items.status}
                    </span>
                  )}
                  {items.status === "Delivered" && (
                    <span className="px-3 py-1 rounded-full bg-green-600/30 text-green-300 text-sm">
                      {items.status}
                    </span>
                  )}
                </div>

                {/* Mode */}
                <div className="hidden md:block w-[10%] text-[#D7C4A9]/70 text-sm">
                  COD
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
