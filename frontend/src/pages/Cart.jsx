import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useSnackbar } from "notistack";

const Cart = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // GET CART DATA
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/cart/get-user-cart",
          { headers }
        );
        setCart(res.data.data);
      } catch (err) {
        enqueueSnackbar("Failed to load cart", { variant: "error" });
      }
    };

    fetchCart();
  }, []); // FIXED infinite loop

  // DELETE CART ITEM
  const deleteItem = async (bookid) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/cart/remove-from-cart/${bookid}`,
        {},
        { headers }
      );

      enqueueSnackbar(res.data.message, { variant: "success" });

      // refresh cart after delete
      setCart((prev) => prev.filter((item) => item._id !== bookid));
    } catch (err) {
      enqueueSnackbar("Failed to remove item", { variant: "error" });
    }
  };

  // CALCULATE TOTAL
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((items) => (total += items.price));
      setTotal(total);
    }
  }, [Cart]);

  // PLACE ORDER
  const PlaceOrder = async () => {
    try {
      if (!Cart || Cart.length === 0) {
        enqueueSnackbar("Your cart is empty", { variant: "warning" });
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/api/order/place-order",
        { order: Cart },
        { headers }
      );

      enqueueSnackbar(res.data.message, { variant: "success" });
      navigate("/profile/orderHistory");
    } catch (error) {
      enqueueSnackbar("Failed to place order", { variant: "error" });
    }
  };

  return (
    <div className="bg-[#3B2F2F] px-6 md:px-12 min-h-screen py-10 text-[#F2E8D5]">
      {/* LOADER */}
      {!Cart && (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* EMPTY CART */}
      {Cart && Cart.length === 0 && (
        <div className="h-[70vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold text-[#D7C4A9] mb-4">
            Your cart is empty
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/102/102661.png"
            alt="Empty Cart"
            className="h-[22vh] opacity-80"
          />
          <p className="mt-4 text-[#D7C4A9]/80">Add books to continue</p>
        </div>
      )}

      {/* CART ITEMS */}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl md:text-5xl font-bold mb-10 drop-shadow">
            Your Cart
          </h1>

          <div className="space-y-6">
            {Cart.map((items, i) => (
              <div
                key={i}
                className="
              bg-[#4A3B34]/40
              border border-[#8B5E3C]/30
              backdrop-blur-xl
              rounded-2xl shadow-md
              p-4 md:p-5
              flex flex-col md:flex-row 
              justify-between 
              gap-4 
              hover:bg-[#4A3B34]/60 transition-all
            "
              >
                {/* IMAGE */}
                <img
                  src={items.url}
                  alt="/"
                  className="h-[22vh] md:h-[14vh] object-cover rounded-lg shadow-md"
                />

                {/* TEXT */}
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold">{items.title}</h1>

                  <p className="text-[#D7C4A9]/80 mt-2 hidden md:block">
                    {items.desc.slice(0, 120)}...
                  </p>
                  <p className="text-[#D7C4A9]/80 mt-2 block md:hidden">
                    {items.desc.slice(0, 90)}...
                  </p>
                </div>

                {/* PRICE + DELETE */}
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
                  <h2 className="text-3xl font-bold text-[#E85A4F]">
                    Rs. {items.price}
                  </h2>

                  {/* Delete button */}
                  <button
                    className="
                    bg-[#E85A4F]/20 
                    text-[#E85A4F] 
                    border border-[#E85A4F] 
                    p-3 rounded-xl 
                    text-xl 
                    hover:bg-[#E85A4F]/40 
                    transition-all
                  "
                    onClick={() => deleteItem(items._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ORDER SUMMARY */}
      {Cart && Cart.length > 0 && (
        <div className="mt-10 flex justify-end">
          <div
            className="
          bg-[#4A3B34]/40 
          border border-[#8B5E3C]/30 
          backdrop-blur-xl 
          rounded-2xl 
          shadow-md 
          p-6 
          w-full md:w-1/3
        "
          >
            <h1 className="text-3xl font-bold text-[#F2E8D5]">
              Order Summary
            </h1>

            <div className="mt-4 flex justify-between text-lg text-[#D7C4A9]">
              <span>{Cart.length} Books</span>
              <span>Rs. {Total}</span>
            </div>

            <button
              className="
            w-full mt-6 bg-[#8B5E3C] 
            text-white font-semibold 
            py-3 rounded-xl 
            hover:bg-[#E85A4F] transition-all
          "
              onClick={PlaceOrder}
            >
              Place your Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
