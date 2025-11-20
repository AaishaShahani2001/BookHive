import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");

  const priceOptions = {
    all: [0, 99999],
    "500-1000": [500, 1000],
    "1000-3000": [1000, 3000],
    "3000-5000": [3000, 5000],
    "5000-9000": [5000, 9000],
    "9000-15000": [9000, 15000],
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/book/get-all-books`
      );
      setData(response.data.data);
      setFiltered(response.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    let updated = [...Data];

    // SEARCH FILTER
    if (search.trim() !== "") {
      updated = updated.filter(
        (book) =>
          (book.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
          (book.author?.toLowerCase() || "").includes(search.toLowerCase())
      );
    }

    // CATEGORY FILTER
    if (categoryFilter !== "all") {
      updated = updated.filter((book) => book.category === categoryFilter);
    }

    // LANGUAGE FILTER
    if (languageFilter !== "all") {
      updated = updated.filter((book) => book.language === languageFilter);
    }

    // PRICE FILTER
    const [minPrice, maxPrice] = priceOptions[priceFilter];
    updated = updated.filter(
      (book) => book.price >= minPrice && book.price <= maxPrice
    );

    // SORT OPTION (PRICE + A-Z/Z-A)
    if (sortOption === "low-high") updated.sort((a, b) => a.price - b.price);
    if (sortOption === "high-low") updated.sort((a, b) => b.price - a.price);
    if (sortOption === "a-z")
      updated.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOption === "z-a")
      updated.sort((a, b) => b.title.localeCompare(a.title));

    setFiltered(updated);
  }, [search, priceFilter, categoryFilter, languageFilter, sortOption, Data]);

  return (
    <div className="bg-[#3B2F2F] min-h-screen px-6 md:px-12 py-10">

      {/* Heading Row: Title + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h4 className="text-[#F2E8D5] text-3xl font-semibold underline underline-offset-4 decoration-[#8B5E3C]">
          All Books
        </h4>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search books, author..."
          className="
            mt-4 md:mt-0 px-4 py-2 rounded-lg bg-[#F2E8D5] 
            text-[#3B2F2F] outline-none w-full md:w-80
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER SECTION */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* CATEGORY FILTER */}
        <select
          className="px-4 py-2 rounded-lg bg-[#F2E8D5] text-[#3B2F2F] outline-none"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="O/L-Books">O/L-Books</option>
          <option value="A/L-Books">A/L-Books</option>
          <option value="Story Books">Story Books</option>
          <option value="Self Development">Self Development</option>
          <option value="Programming">Programming</option>
        </select>

        {/* LANGUAGE FILTER */}
        <select
          className="px-4 py-2 rounded-lg bg-[#F2E8D5] text-[#3B2F2F] outline-none"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <option value="all">All Languages</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Sinhala">Sinhala</option>
        </select>

        {/* PRICE RANGE */}
        <select
          className="px-4 py-2 rounded-lg bg-[#F2E8D5] text-[#3B2F2F] outline-none"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="500-1000">LKR 500 - 1000</option>
          <option value="1000-3000">LKR 1000 - 3000</option>
          <option value="3000-5000">LKR 3000 - 5000</option>
          <option value="5000-9000">LKR 5000 - 9000</option>
          <option value="9000-15000">LKR 9000 - 15000</option>
        </select>

        {/* SORT OPTIONS */}
        <select
          className="px-4 py-2 rounded-lg bg-[#F2E8D5] text-[#3B2F2F] outline-none"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="a-z">Title: A → Z</option>
          <option value="z-a">Title: Z → A</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>

      </div>

      {/* Book Count */}
      <p className="text-[#D7B899] mt-4">
        Showing{" "}
        <span className="font-semibold text-[#E85A4F]">{filtered.length}</span>{" "}
        books
      </p>

      {/* LOADER */}
      {!Data.length && (
        <div className="flex items-center justify-center my-10">
          <Loader />
        </div>
      )}

      {/* NO RESULTS */}
      {filtered.length === 0 && (
        <div className="text-center text-[#F2E8D5] text-xl mt-10">
          ❌ No results found
        </div>
      )}

      {/* BOOK GRID */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map((item, i) => (
          <BookCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
