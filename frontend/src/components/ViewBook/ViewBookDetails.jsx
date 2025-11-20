import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { GrLanguage } from 'react-icons/gr'
import { FaEdit, FaHeart, FaShoppingCart } from 'react-icons/fa'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';
import { useSnackbar } from 'notistack';

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/book/get-a-book/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        enqueueSnackbar("Failed to load book details", { variant: "error" });
      }
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  // ADD TO FAVOURITES
  const handleFavourites = async () => {
    try {
      if (!isLoggedIn) {
        enqueueSnackbar("Please login first", { variant: "warning" });
        return;
      }

      const response = await axios.put(
        'http://localhost:3000/api/favourite/add-book-to-favourite',
        {},
        { headers }
      );

      enqueueSnackbar(response.data.message, { variant: "success" });

    } catch (err) {
      enqueueSnackbar("Failed to add to favourites", { variant: "error" });
    }
  };

  // ADD TO CART
  const handleCart = async () => {
    try {
      if (!isLoggedIn) {
        enqueueSnackbar("Please login first", { variant: "warning" });
        return;
      }

      const response = await axios.put(
        'http://localhost:3000/api/cart/add-to-cart',
        {},
        { headers }
      );

      enqueueSnackbar(response.data.message, { variant: "success" });

    } catch (err) {
      enqueueSnackbar("Failed to add to cart", { variant: "error" });
    }
  };

  // DELETE BOOK
  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:3000/api/book/delete-book',
        { headers }
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
      navigate("/all-books");
    } catch (err) {
      enqueueSnackbar("Failed to delete book", { variant: "error" });
    }
  };

  //  3-STATE STOCK BADGE COLORS
  const stockBadge =
    Data?.stockStatus === "Available"
      ? "bg-green-600/20 text-green-400 border border-green-500/30"
      : Data?.stockStatus === "Low Stock"
      ? "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
      : "bg-red-600/20 text-red-400 border border-red-500/30"; // Unavailable

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-10 bg-[#3B2F2F] flex flex-col lg:flex-row gap-10 items-start text-[#F2E8D5]">

          {/* LEFT SECTION */}
          <div className="w-full lg:w-3/6">
            <div className="
              flex flex-col lg:flex-row justify-around 
              bg-[#4A3B34] p-10 rounded-xl shadow-xl shadow-black/40
            ">
              
              {/* BOOK IMAGE */}
              <img 
                src={Data.url} 
                alt={Data.title}
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-xl shadow-lg shadow-black/40 object-cover"
              />

              {/* USER BUTTONS */}
              {isLoggedIn && role === 'user' && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center gap-6 lg:gap-8 mt-6 lg:mt-0">

                  <button 
                    className="bg-[#8B5E3C] text-white p-3 rounded-full 
                      text-3xl shadow-md hover:bg-[#E85A4F] flex items-center justify-center"
                    onClick={handleFavourites}
                  >
                    <FaHeart />
                  </button>

                  <button 
                    className="bg-[#E85A4F] text-white p-3 rounded-full text-3xl
                     shadow-md hover:bg-[#8B5E3C] flex items-center justify-center"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>

                </div>
              )}

              {/* ADMIN BUTTONS */}
              {isLoggedIn && role === 'admin' && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center gap-6 lg:gap-8 mt-6 lg:mt-0">

                  <Link 
                    to={`/UpdateBook/${id}`}
                    className="bg-[#8B5E3C] text-white p-3 rounded-full text-3xl
                      shadow-md hover:bg-[#E85A4F] flex items-center justify-center"
                  >
                    <FaEdit />
                  </Link>

                  <button 
                    className="bg-[#E85A4F] text-white p-3 rounded-full text-3xl
                      shadow-md hover:bg-red-700 flex items-center justify-center"
                    onClick={deleteBook}
                  >
                    <MdOutlineDelete />
                  </button>

                </div>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full lg:w-3/6 p-4">
            <h1 className="text-4xl font-bold text-[#F2E8D5] drop-shadow-md">
              {Data.title}
            </h1>

            <p className="mt-3 text-xl text-[#D7C4A9]">by {Data.author}</p>

            {/* BADGES */}
            <div className="flex flex-wrap gap-3 mt-4">

              <span className="
                px-4 py-1 rounded-full 
                bg-[#8B5E3C]/20 border border-[#8B5E3C]/40
                text-[#D7B899] text-sm
              ">
                {Data.category}
              </span>

              <span className="
                px-4 py-1 rounded-full flex items-center gap-2
                bg-[#4A3B34]/40 border border-[#8B5E3C]/30
                text-[#F2E8D5] text-sm
              ">
                <GrLanguage size={16} /> {Data.language}
              </span>

              <span className={`px-4 py-1 rounded-full text-sm ${stockBadge}`}>
                {Data.stockStatus}
              </span>

            </div>

            <p className="mt-5 text-[#F2E8D5]/90 leading-relaxed tracking-wide">
              {Data.desc}
            </p>

            <p className="mt-6 text-3xl font-semibold text-[#E85A4F]">
              Price: Rs. {Data.price}
            </p>

          </div>
        </div>
      )}

      {!Data && (
        <div className="h-screen bg-[#3B2F2F] flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
