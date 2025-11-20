import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const AddBook = () => {
  const [Data, setData] = useState({
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    category: "",
    stockStatus: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
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

    setImage(file);
  };

  const submit = async () => {
    try {
      if (!image) {
        enqueueSnackbar("Please upload a book image", { variant: "warning" });
        return;
      }

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

      const formData = new FormData();
      formData.append("image", image);
      Object.keys(Data).forEach((key) => formData.append(key, Data[key]));

      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/book/add-book",
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      enqueueSnackbar(response.data.message, { variant: "success" });

      // Reset form
      setData({
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
        category: "",
        stockStatus: "",
      });
      setImage(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      enqueueSnackbar(error?.response?.data?.message || "Error adding book", {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-[#3B2F2F] text-[#F2E8D5]">
      <h1 className="text-4xl md:text-5xl font-semibold mb-10 text-[#D7C4A9]">
        Add a New Book
      </h1>

      <div
        className="
          bg-[#4A3B34]/70 
          border border-[#8B5E3C]/30 
          backdrop-blur-xl 
          rounded-2xl 
          shadow-2xl 
          p-8 md:p-10
          max-w-4xl
        "
      >
        {/* IMAGE UPLOAD */}
        <div className="mb-6">
          <label className="text-[#F2E8D5]/90 font-medium">
            Book Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-2 w-full p-2 
              rounded-lg bg-[#3B2F2F] 
              text-[#F2E8D5]
              border border-[#8B5E3C]/40
              focus:border-[#E85A4F]
              outline-none transition-all"
            onChange={handleImageChange}
          />
        </div>

        {/* GRID FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TITLE */}
          <div>
            <label className="text-[#F2E8D5]/90 font-medium">Title</label>
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
            <label className="text-[#F2E8D5]/90 font-medium">Author</label>
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

          {/* PRICE */}
          <div>
            <label className="text-[#F2E8D5]/90 font-medium">Price (Rs.)</label>
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

          {/* LANGUAGE */}
          <div>
            <label className="text-[#F2E8D5]/90 font-medium">Language</label>
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

          {/* CATEGORY */}
          <div>
            <label className="text-[#F2E8D5]/90 font-medium">Category</label>
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
            <label className="text-[#F2E8D5]/90 font-medium">Stock Status</label>
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
        <div className="mt-6 mb-8">
          <label className="text-[#F2E8D5]/90 font-medium">Description</label>
          <textarea
            name="desc"
            value={Data.desc}
            rows="4"
            onChange={change}
            className="
              mt-2 w-full p-2 rounded-lg 
              bg-[#3B2F2F] text-[#F2E8D5]
              border border-[#8B5E3C]/40 
              focus:border-[#E85A4F]
            "
          />
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="
            w-full py-3 text-xl font-bold rounded-lg 
            bg-[#8B5E3C] text-white
            hover:bg-[#E85A4F] 
            disabled:opacity-60
            shadow-lg hover:shadow-xl 
            transition-all duration-300
          "
        >
          {loading ? "Uploading..." : "Add Book"}
        </button>
      </div>
    </div>
  );
};

export default AddBook;
