import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const BookCard = ({ data, favourite, onRemove }) => {
  const { enqueueSnackbar } = useSnackbar();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "https://bookhive-backend-muz9.onrender.com/api/favourite/remove-book-from-favourite",
        {},
        { headers }
      );

      enqueueSnackbar(response.data.message, {
        variant: "success",
      });

      // OPTIONAL: let parent update UI without refresh
      if (onRemove) onRemove(data._id);

    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Failed to remove book",
        { variant: "error" }
      );
    }
  };

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
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
