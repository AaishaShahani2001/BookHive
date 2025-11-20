import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const UpdateBook = () => {
  const [Data, setData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    url: "",
    category: "",
    stockStatus: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 4 * 1024 * 1024) {
      enqueueSnackbar("Image too large (max 4MB)", { variant: "warning" });
      return;
    }

    setNewImage(file);
  };

  const submit = async () => {
    try {
      if (
        !Data.title ||
        !Data.author ||
        !Data.price ||
        !Data.desc ||
        !Data.language ||
        !Data.category ||
        !Data.stockStatus
      ) {
        enqueueSnackbar("All fields are required", { variant: "warning" });
        return;
      }

      setLoading(true);

      const formData = new FormData();
      Object.keys(Data).forEach((key) => formData.append(key, Data[key]));

      if (newImage) formData.append("image", newImage);

      const response = await axios.put(
        "http://localhost:3000/api/book/update-book",
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      enqueueSnackbar(response.data.message, { variant: "success" });
      navigate(`/view-book-details/${id}`);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);

      enqueueSnackbar(
        error?.response?.data?.message || "Error updating book",
        { variant: "error" }
      );
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/book/get-a-book/${id}`
        );
        setData(response.data.data);
      } catch (err) {
        enqueueSnackbar("Error loading book details", { variant: "error" });
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-[#3B2F2F] min-h-screen py-10 px-4 md:px-12 text-[#F2E8D5]">

      <h1 className="text-4xl md:text-5xl font-bold text-[#FFD9A8] drop-shadow mb-10">
        Update Book
      </h1>

      <div
        className="
          bg-[#4A3B34]/80
          border border-[#8B5E3C]/40
          p-8 md:p-10
          rounded-2xl
          shadow-xl
          max-w-4xl mx-auto
        "
      >

        {/* CURRENT IMAGE */}
        <div className="mb-6">
          <label className="block text-[#D7C4A9] font-semibold mb-2">
            Current Cover Image
          </label>
          <img
            src={Data.url}
            alt="book"
            className="h-40 w-40 object-cover rounded-lg shadow-lg border border-[#8B5E3C]/40"
          />
        </div>

        {/* NEW IMAGE */}
        <div className="mb-6">
          <label className="text-[#D7C4A9] font-semibold">
            Upload New Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
              w-full mt-2 p-2 bg-[#3B2F2F] text-[#F2E8D5] 
              rounded-lg border border-[#8B5E3C]/40 outline-none
              focus:border-[#E85A4F] transition
            "
          />
        </div>

        {/* GRID FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TITLE */}
          <div>
            <label className="text-[#D7C4A9]">Title</label>
            <input
              type="text"
              name="title"
              value={Data.title}
              onChange={change}
              className="
                mt-2 w-full p-2 rounded-lg 
                bg-[#3B2F2F] text-[#F2E8D5]
                border border-[#8B5E3C]/40 
                focus:border-[#E85A4F]
              "
            />
          </div>

          {/* AUTHOR */}
          <div>
            <label className="text-[#D7C4A9]">Author</label>
            <input
              type="text"
              name="author"
              value={Data.author}
              onChange={change}
              className="
                mt-2 w-full p-2 rounded-lg 
                bg-[#3B2F2F] text-[#F2E8D5]
                border border-[#8B5E3C]/40 
                focus:border-[#E85A4F]
              "
            />
          </div>

          {/* LANGUAGE */}
          <div>
            <label className="text-[#D7C4A9]">Language</label>
            <select
              name="language"
              value={Data.language}
              onChange={change}
              className="
                mt-2 w-full p-2 rounded-lg 
                bg-[#3B2F2F] text-[#F2E8D5]
                border border-[#8B5E3C]/40 
                focus:border-[#E85A4F]
              "
            >
              <option value="">Select Language</option>
              <option>English</option>
              <option>Tamil</option>
              <option>Sinhala</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="text-[#D7C4A9]">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              value={Data.price}
              onChange={change}
              className="
                mt-2 w-full p-2 rounded-lg 
                bg-[#3B2F2F] text-[#F2E8D5]
                border border-[#8B5E3C]/40 
                focus:border-[#E85A4F]
              "
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-[#D7C4A9]">Category</label>
            <select
              name="category"
              value={Data.category}
              onChange={change}
              className="
                mt-2 w-full p-2 rounded-lg 
                bg-[#3B2F2F] text-[#F2E8D5]
                border border-[#8B5E3C]/40 
                focus:border-[#E85A4F]
              "
            >
              <option value="">Select Category</option>
              <option>O/L-Books</option>
              <option>A/L-Books</option>
              <option>Story Books</option>
              <option>Self Development</option>
              <option>Programming</option>
            </select>
          </div>

          {/* STOCK STATUS */}
          <div>
            <label className="text-[#D7C4A9]">Stock Status</label>
            <select
              name="stockStatus"
              value={Data.stockStatus}
              onChange={change}
              className="
                mt-2 w-full p-2 rounded-lg 
                bg-[#3B2F2F] text-[#F2E8D5]
                border border-[#8B5E3C]/40 
                focus:border-[#E85A4F]
              "
            >
              <option value="">Select Status</option>
              <option>Available</option>
              <option>Unavailable</option>
              <option>Low Stock</option>
            </select>
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="text-[#D7C4A9]">Description</label>
          <textarea
            name="desc"
            rows="4"
            value={Data.desc}
            onChange={change}
            className="
              mt-2 w-full p-2 rounded-lg 
              bg-[#3B2F2F] text-[#F2E8D5]
              border border-[#8B5E3C]/40 
              focus:border-[#E85A4F]
            "
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          disabled={loading}
          className="
            mt-8 w-full py-3 text-lg font-semibold
            bg-[#8B5E3C] text-white rounded-lg
            hover:bg-[#E85A4F] 
            disabled:opacity-60
            shadow-md hover:shadow-xl transition
          "
        >
          {loading ? "Updating..." : "Update Book"}
        </button>

      </div>
    </div>
  );
};

export default UpdateBook;
