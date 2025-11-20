import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";
import Loader from "../components/Loader/Loader";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0));
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [dailySales, setDailySales] = useState({ labels: [], data: [] });
  const [statusCounts, setStatusCounts] = useState({ labels: [], data: [] });

  const [topBooks, setTopBooks] = useState({ labels: [], data: [] });
  const [topCustomers, setTopCustomers] = useState([]);
  const [forecastRevenue, setForecastRevenue] = useState(0);

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://bookhive-backend-muz9.onrender.com/api/order/get-all-orders",
        { headers }
      );
      setOrders(response.data.data || []);
    } catch (error) {
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Simple linear regression to forecast next month revenue
  const forecastNextMonth = (revenues) => {
    const points = [];
    for (let i = 0; i < revenues.length; i++) {
      if (revenues[i] > 0) {
        points.push({ x: i, y: revenues[i] });
      }
    }
    if (points.length < 2) {
      // Not enough data → use last non-zero or 0
      const last = [...revenues].reverse().find((v) => v > 0) || 0;
      return last;
    }

    const n = points.length;
    const sumX = points.reduce((s, p) => s + p.x, 0);
    const sumY = points.reduce((s, p) => s + p.y, 0);
    const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
    const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);

    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) {
      return points[points.length - 1].y;
    }

    const m = (n * sumXY - sumX * sumY) / denom;
    const b = (sumY - m * sumX) / n;

    const nextX = points[points.length - 1].x + 1;
    const forecast = m * nextX + b;
    return Math.max(0, forecast);
  };

  // Process all dashboard data
  useEffect(() => {
    if (!orders || orders.length === 0) {
      setTotalOrders(0);
      setTotalRevenue(0);
      setMonthlyOrders(Array(12).fill(0));
      setMonthlyRevenue(Array(12).fill(0));
      setDailySales({ labels: [], data: [] });
      setStatusCounts({ labels: [], data: [] });
      setTopBooks({ labels: [], data: [] });
      setTopCustomers([]);
      setForecastRevenue(0);
      return;
    }

    // Total orders (all)
    setTotalOrders(orders.length);

    // Only delivered orders for revenue-based stats
    const deliveredOrders = orders.filter((o) => o.status === "Delivered");

    // ===== Total Revenue (Delivered only) =====
    const totalRev = deliveredOrders.reduce(
      (sum, o) => sum + (o.book?.price || 0) * (o.quantity || 1),
      0
    );
    setTotalRevenue(totalRev);

    // ===== Monthly Orders (all) + Monthly Revenue (Delivered only) =====
    const monthlyOrdersArr = Array(12).fill(0);
    const monthlyRevenueArr = Array(12).fill(0);

    orders.forEach((o) => {
      const created = new Date(o.createdAt);
      const month = created.getMonth(); // 0-11

      // Count all orders for orders-per-month chart
      monthlyOrdersArr[month] += 1;

      // Revenue only from delivered
      if (o.status === "Delivered") {
        const price = o.book?.price || 0;
        const qty = o.quantity || 1;
        monthlyRevenueArr[month] += price * qty;
      }
    });

    setMonthlyOrders(monthlyOrdersArr);
    setMonthlyRevenue(monthlyRevenueArr);

    // ===== Daily Sales (Last 7 days, Delivered only) =====
    const today = new Date();
    const dayLabels = [];
    const dayKeys = [];
    const dayRevenueMap = {};

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      dayLabels.push(label);
      dayKeys.push(key);
      dayRevenueMap[key] = 0;
    }

    deliveredOrders.forEach((o) => {
      const created = new Date(o.createdAt);
      const key = created.toISOString().slice(0, 10);
      const price = o.book?.price || 0;
      const qty = o.quantity || 1;
      if (dayRevenueMap[key] !== undefined) {
        dayRevenueMap[key] += price * qty;
      }
    });

    setDailySales({
      labels: dayLabels,
      data: dayKeys.map((k) => dayRevenueMap[k]),
    });

    // ===== Order Status Distribution (all orders) =====
    const statusMap = {};
    orders.forEach((o) => {
      const status = o.status || "Unknown";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    setStatusCounts({
      labels: Object.keys(statusMap),
      data: Object.values(statusMap),
    });

    // ===== Top 5 Best Selling Books (by delivered quantity) =====
    const bookMap = {};
    deliveredOrders.forEach((o) => {
      if (!o.book) return;
      const id = o.book._id || o.book.id || o.book.title;
      const title = o.book.title || "Untitled";
      const qty = o.quantity || 1;
      const price = o.book.price || 0;

      if (!bookMap[id]) {
        bookMap[id] = { title, qty: 0, revenue: 0 };
      }
      bookMap[id].qty += qty;
      bookMap[id].revenue += qty * price;
    });

    const bookArray = Object.values(bookMap)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    setTopBooks({
      labels: bookArray.map((b) => b.title),
      data: bookArray.map((b) => b.qty),
    });

    // ===== Top Customers Leaderboard (by delivered revenue) =====
    const customerMap = {};
    deliveredOrders.forEach((o) => {
      if (!o.user) return;
      const id = o.user._id || o.user.id || o.user.email;
      const name = o.user.username || o.user.name || "Unknown User";
      const email = o.user.email || "N/A";
      const price = o.book?.price || 0;
      const qty = o.quantity || 1;
      const revenue = price * qty;

      if (!customerMap[id]) {
        customerMap[id] = {
          name,
          email,
          orders: 0,
          revenue: 0,
        };
      }
      customerMap[id].orders += 1;
      customerMap[id].revenue += revenue;
    });

    const customersArray = Object.values(customerMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    setTopCustomers(customersArray);

    // ===== Forecast next month revenue (simple regression) =====
    const forecast = forecastNextMonth(monthlyRevenueArr);
    setForecastRevenue(Math.round(forecast));
  }, [orders]);

  // Chart data

  const monthsLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const monthlyOrdersData = {
    labels: monthsLabels,
    datasets: [
      {
        label: "Orders Per Month",
        data: monthlyOrders,
        backgroundColor: "#8B5E3C",
        borderRadius: 6,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: monthsLabels,
    datasets: [
      {
        label: "Revenue Per Month (Delivered Only)",
        data: monthlyRevenue,
        backgroundColor: "#E85A4F",
        borderRadius: 6,
      },
    ],
  };

  const dailySalesData = {
    labels: dailySales.labels,
    datasets: [
      {
        label: "Daily Sales (Last 7 Days | Delivered Only)",
        data: dailySales.data,
        borderColor: "#D7B899",
        backgroundColor: "rgba(215,184,153,0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const statusPieData = {
    labels: statusCounts.labels,
    datasets: [
      {
        data: statusCounts.data,
        backgroundColor: [
          "#8B5E3C",
          "#E85A4F",
          "#D7B899",
          "#3B2F2F",
          "#4A3B34",
        ],
        borderWidth: 1,
      },
    ],
  };

  const topBooksData = {
    labels: topBooks.labels,
    datasets: [
      {
        label: "Units Sold (Delivered Only)",
        data: topBooks.data,
        backgroundColor: "#D7B899",
        borderRadius: 6,
      },
    ],
  };

  // PDF Revenue Report (Delivered only)
  const downloadRevenueReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("BookHive — Revenue Report (Delivered Orders Only)", 14, 20);

    doc.setFontSize(12);
    doc.text(`Total Orders: ${totalOrders}`, 14, 30);
    doc.text(`Delivered Revenue: Rs. ${totalRevenue}`, 14, 37);
    doc.text(
      `Average Order Value: Rs. ${(totalRevenue / (totalOrders || 1)).toFixed(
        0
      )}`,
      14,
      44
    );

    const tableRows = monthsLabels.map((m, idx) => [
      m,
      monthlyOrders[idx],
      `Rs. ${monthlyRevenue[idx].toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 52,
      head: [["Month", "Orders", "Delivered Revenue"]],
      body: tableRows,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139, 94, 60] },
    });

    doc.save("BookHive_Delivered_Revenue_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-[#3B2F2F] p-10 text-[#F2E8D5]">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <h1 className="text-4xl font-bold underline decoration-[#8B5E3C] underline-offset-4">
          Admin Dashboard
        </h1>

        <button
          onClick={downloadRevenueReport}
          className="bg-[#E85A4F] hover:bg-[#8B5E3C] transition px-5 py-2 rounded-lg font-semibold"
        >
          Download Delivered Revenue PDF
        </button>
      </div>

      {loading ? (
        <div className="h-[60vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <p className="text-4xl mt-2 font-bold text-[#E85A4F]">
                {totalOrders}
              </p>
            </div>

            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold">Delivered Revenue</h2>
              <p className="text-4xl mt-2 font-bold text-green-400">
                Rs. {totalRevenue}
              </p>
            </div>

            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold">Avg Order Value</h2>
              <p className="text-4xl mt-2 font-bold">
                Rs. {(totalRevenue / (totalOrders || 1)).toFixed(0)}
              </p>
            </div>

            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold">Next Month Forecast</h2>
              <p className="text-4xl mt-2 font-bold text-[#D7B899]">
                Rs. {forecastRevenue}
              </p>
            </div>

          </div>

          {/* Row 1: Orders & Revenue per month */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Orders Per Month
              </h2>
              <Bar data={monthlyOrdersData} height={120} />
            </div>

            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Revenue Per Month (Delivered Only)
              </h2>
              <Bar data={monthlyRevenueData} height={120} />
            </div>
          </div>

          {/* Row 2: Daily Sales & Status Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Daily Sales (Last 7 Days | Delivered Only)
              </h2>
              <Line data={dailySalesData} height={120} />
            </div>

            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Order Status Distribution
              </h2>
              {statusCounts.labels.length > 0 ? (
                <Pie data={statusPieData} height={120} />
              ) : (
                <p className="text-sm text-[#D7B899]">
                  No orders to display status distribution.
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Top Books & Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 5 Best Selling Books */}
            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Top 5 Best Selling Books (Delivered)
              </h2>
              {topBooks.labels.length > 0 ? (
                <Bar data={topBooksData} height={120} />
              ) : (
                <p className="text-sm text-[#D7B899]">
                  Not enough data to show best sellers.
                </p>
              )}
            </div>

            {/* Top Customers Leaderboard */}
            <div className="bg-[#4A3B34] border border-[#8B5E3C]/40 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Top Customers (Delivered Revenue)
              </h2>
              {topCustomers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm md:text-base">
                    <thead>
                      <tr className="border-b border-[#8B5E3C]/40 text-left">
                        <th className="py-2 pr-2">#</th>
                        <th className="py-2 pr-2">Customer</th>
                        <th className="py-2 pr-2">Email</th>
                        <th className="py-2 pr-2 text-right">Orders</th>
                        <th className="py-2 pr-2 text-right">Revenue (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCustomers.map((c, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[#8B5E3C]/20 last:border-b-0"
                        >
                          <td className="py-2 pr-2">{idx + 1}</td>
                          <td className="py-2 pr-2">{c.name}</td>
                          <td className="py-2 pr-2">{c.email}</td>
                          <td className="py-2 pr-2 text-right">
                            {c.orders}
                          </td>
                          <td className="py-2 pr-2 text-right">
                            {c.revenue.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-[#D7B899]">
                  No delivered orders to build a leaderboard.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
