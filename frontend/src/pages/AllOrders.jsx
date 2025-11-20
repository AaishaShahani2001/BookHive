// src/pages/AllOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaCheck, FaSearch, FaDownload, FaUserAlt } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const [loading, setLoading] = useState(false);

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bookhive-backend-muz9.onrender.com/api/order/get-all-orders",
        { headers }
      );
      setOrders(response.data.data || []);
      setFiltered(response.data.data || []);
    } catch (error) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Date filtering helper
  const filterByDate = (dateString, type) => {
    const date = new Date(dateString);
    const today = new Date();

    const d = new Date(date.setHours(0, 0, 0, 0));
    const t = new Date(today.setHours(0, 0, 0, 0));

    if (type === "Today") return d.getTime() === t.getTime();

    if (type === "This Week") {
      const first = new Date(t);
      first.setDate(t.getDate() - t.getDay());

      const last = new Date(first);
      last.setDate(first.getDate() + 6);

      return date >= first && date <= last;
    }

    if (type === "This Month") {
      return (
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }

    return true;
  };

  // Filters
  useEffect(() => {
    let temp = [...orders];

    // SEARCH
    if (search.trim() !== "") {
      const s = search.toLowerCase();
      temp = temp.filter((o) => {
        const title = o.book?.title?.toLowerCase() || "";
        const uname = o.user?.username?.toLowerCase() || "";
        const email = o.user?.email?.toLowerCase() || "";

        return (
          title.includes(s) || uname.includes(s) || email.includes(s)
        );
      });
    }

    // STATUS
    if (filterStatus !== "All") {
      temp = temp.filter((o) => o.status === filterStatus);
    }

    // DATE FILTER
    if (dateFilter !== "All") {
      temp = temp.filter((o) => filterByDate(o.createdAt, dateFilter));
    }

    setFiltered(temp);
  }, [search, filterStatus, dateFilter, orders]);

  // Update Status
  const updateStatus = async (index) => {
    try {
      const id = filtered[index]._id;

      const response = await axios.put(
        `http://localhost:3000/api/order/update-status/${id}`,
        { status: selectedStatus },
        { headers }
      );

      alert(response.data.message);
      setActiveIndex(null);
      fetchOrders();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-yellow-300";
      case "Out for Delivery":
        return "text-blue-300";
      case "Delivered":
        return "text-green-400";
      case "Canceled":
        return "text-red-400";
      default:
        return "text-[#F2E8D5]";
    }
  };

  // PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("BookHive — All Orders Summary", 14, 20);

    const tableRows = filtered.map((o, i) => [
      i + 1,
      o.book?.title || "Deleted",
      "Rs." + (o.book?.price || "N/A"),
      o.status,
      o.user?.username || "N/A",
      o.user?.email || "N/A",
      new Date(o.createdAt).toLocaleString()
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["#", "Book", "Price", "Status", "User", "Email", "Date"]],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139, 94, 60] },
    });

    doc.save("BookHive_All_Orders.pdf");
  };

  return (
    <div className="min-h-screen bg-[#3B2F2F] text-[#F2E8D5] p-6">

      {loading && (
        <div className="h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {!loading && (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <h1 className="text-5xl font-bold drop-shadow mb-4 md:mb-0">
              All Orders
            </h1>

            <div className="flex flex-col md:flex-row gap-4 items-center">

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E85A4F]/70" />
                <input
                  type="text"
                  placeholder="Search book, username, email"
                  className="pl-10 pr-4 py-2 bg-[#4A3B34] border border-[#8B5E3C]/40 rounded-lg outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#4A3B34] border border-[#8B5E3C]/40 px-3 py-2 rounded-lg"
              >
                <option>All</option>
                <option>Order Placed</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
                <option>Canceled</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-[#4A3B34] border border-[#8B5E3C]/40 px-3 py-2 rounded-lg"
              >
                <option>All</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>

              {/* PDF */}
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 bg-[#E85A4F] px-4 py-2 rounded-lg hover:bg-[#8B5E3C] transition"
              >
                <FaDownload /> PDF
              </button>
            </div>
          </div>

          {filtered.length === 0 && (
            <p className="text-xl text-[#D7C4A9]">No matching orders.</p>
          )}

          {filtered.length > 0 && (
            <>
              {/* Table header */}
              <div className="bg-[#4A3B34]/50 border border-[#8B5E3C]/40 rounded-xl py-3 px-4 flex gap-4 font-semibold">
                <div className="w-[5%]">#</div>
                <div className="w-[18%]">Book</div>
                <div className="hidden md:block w-[30%]">Description</div>
                <div className="w-[12%]">Price</div>
                <div className="w-[20%]">Date & Time</div>
                <div className="w-[15%]">Status</div>
                <div className="w-[10%] text-center"><FaUserAlt /></div>
              </div>

              {/* Order rows */}
              {filtered.map((item, index) => (
                <div
                  key={item._id}
                  className="relative bg-[#4A3B34]/40 border border-[#8B5E3C]/30 rounded-xl py-4 px-4 mt-2 hover:bg-[#4A3B34]/60 transition flex gap-4"
                >
                  <div className="w-[5%] text-center">{index + 1}</div>

                  {/* Book Title */}
                  <div className="w-[18%]">
                    {item.book ? (
                      <Link
                        to={`/view-book-details/${item.book._id}`}
                        className="hover:text-[#E85A4F]"
                      >
                        {item.book.title}
                      </Link>
                    ) : (
                      <span className="text-red-400">Book Deleted</span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="hidden md:block w-[30%] opacity-70">
                    {item.book?.desc?.slice(0, 60)}...
                  </div>

                  {/* Price */}
                  <div className="w-[12%] font-bold text-[#E85A4F]">
                    Rs. {item.book?.price}
                  </div>

                  {/* Date + Time */}
                  <div className="w-[20%] text-sm text-[#D7C4A9]">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>

                  {/* Status */}
                  <div className="w-[15%] font-semibold">
                    <button
                      onClick={() => {
                        setActiveIndex(index);
                        setSelectedStatus(item.status);
                      }}
                    >
                      <span className={statusColor(item.status)}>
                        {item.status}
                      </span>
                    </button>

                    {/* Status Dropdown */}
                    {activeIndex === index && (
                      <div className="absolute left-0 top-full mt-2 bg-[#3B2F2F] border border-[#8B5E3C]/50 rounded-lg p-3 flex items-center gap-3 z-50">
                        <select
                          className="bg-[#3B2F2F] border border-[#8B5E3C]/50 px-3 py-1 rounded-lg"
                          value={selectedStatus}
                          onChange={(e) =>
                            setSelectedStatus(e.target.value)
                          }
                        >
                          <option>Order Placed</option>
                          <option>Out for Delivery</option>
                          <option>Delivered</option>
                          <option>Canceled</option>
                        </select>

                        <button
                          className="text-green-500 hover:text-[#E85A4F] text-xl"
                          onClick={() => updateStatus(index)}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="w-[10%] flex justify-center text-xl">
                    <button
                      className="hover:text-[#E85A4F]"
                      onClick={() => {
                        setUserDiv("fixed");
                        setUserDivData(item.user || null);
                      }}
                    >
                      <IoOpenOutline />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setUserDiv}
        />
      )}
    </div>
  );
};

export default AllOrders;
