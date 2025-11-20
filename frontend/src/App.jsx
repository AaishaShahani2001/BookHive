import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBook/ViewBookDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ReturnsRefunds from "./pages/ReturnsRefunds";
import ShippingInfo from "./pages/ShippingInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

import Favourites from './components/Profile/Favourites.jsx';
import UserOrderHistory from './components/Profile/UserOrderHistory.jsx';
import Settings from './components/Profile/Settings.jsx';
import AllOrders from './pages/AllOrders.jsx';
import AddBook from './pages/AddBook.jsx';
import UpdateBook from './pages/UpdateBook.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import AdminRoute from "./routes/AdminRoute";

const App = () => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  // Restore Login State
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const savedRole = localStorage.getItem("role");

    if (token && id && savedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(savedRole));
    }
  }, []);

  return (
    <div>
       <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />

        <Route path="/profile" element={<Profile />}>
          <Route index element={role === "admin" ? <AllOrders /> : <Favourites />} />

          {/* USER ROUTES */}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />

          {/* ADMIN ROUTES */}
          <Route
            path="add-book"
            element={
              <AdminRoute>
                <AddBook />
              </AdminRoute>
            }
          />

          {/* ADMIN DASHBOARD INSIDE PROFILE */}
          <Route
            path="admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>



        {/* BOOK VIEW */}
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />

        {/* OTHER ROUTES */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/returns" element={<ReturnsRefunds />} />
        <Route path="/shipping" element={<ShippingInfo />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
