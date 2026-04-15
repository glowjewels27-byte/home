import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Analytics } from "@vercel/analytics/react";
import RingExperience from "./pages/RingExperience.jsx";

export default function App() {
  const location = useLocation();
  const isRingPage = location.pathname.startsWith("/ring/");

  return (
    <div className="min-h-screen font-sans">
      <ScrollToTop />
      {!isRingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ring/:slug" element={<RingExperience />} />
      </Routes>
      {!isRingPage && <Footer />}
      <Analytics />
    </div>
  );
}
