// src/AppRoutes.tsx

import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Subscription from "../Subscription/Subscription";
import Contact from "../Contact/Contact";
import Menu from "../Menu/Menu";
import Blog from "../Blog/Blog";
import BlogPost from "../pages/BlogPost";
import Subcriptiondestails from "../pages/Subcriptiondestails";
import AllMenuIteams from "../pages/AllMenuIteams";
import MenuItemDetail from "../pages/MenuItemDetail"; // add this import

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:category/:id" element={<MenuItemDetail />} />
      <Route
        path="/menu/:category/:id/pair/:pairIndex"
        element={<MenuItemDetail />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/post/:slug" element={<BlogPost />} />
      <Route path="/subcriptiondestails" element={<Subcriptiondestails />} />
      <Route path="/allmenuiteams" element={<AllMenuIteams />} />
    </Routes>
  );
}
