import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite, onRemove }) => {

  // STOCK BADGE LOGIC
  const stockBadgeClass =
    data.stockStatus === "Available"
      ? "bg-green-600/20 text-green-400 border border-green-500/30"
      : data.stockStatus === "Low Stock"
      ? "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
      : "bg-red-600/20 text-red-400 border border-red-500/30";

  return (
    <div
      className="
        bg-[#4A3B34] rounded-xl p-5 flex flex-col shadow-md relative
        shadow-black/30 hover:shadow-black/50 hover:scale-[1.02]
        transition-all duration-300
      "
    >
      {/* STOCK BADGE */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${stockBadgeClass}`}
      >
        {data.stockStatus}
      </span>

      {/* BOOK DETAILS LINK */}
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div
            className="
              bg-[#3B2F2F] rounded-lg flex items-center justify-center p-4
              shadow-inner shadow-black/30
            "
          >
            <img
              src={data.url}
              alt={data.title}
              className="h-[25vh] object-contain"
            />
          </div>

          <h2 className="mt-4 text-xl text-[#F2E8D5] font-bold">
            {data.title}
          </h2>

          <p className="mt-1 text-[#D7C4A9]">by {data.author}</p>

          <p className="mt-3 text-[#F2E8D5] font-semibold text-xl">
            Rs. {data.price}
          </p>
        </div>
      </Link>

      {/* REMOVE FROM FAVOURITES BUTTON */}
      {favourite && (
        <button
          className="
            mt-5 px-4 py-2 rounded-lg font-medium w-full
            bg-[#8B5E3C] text-white
            hover:bg-[#E85A4F] transition-all duration-300
          "
          onClick={() => onRemove(data._id)}  // 👉 NO axios, no snackbar
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
