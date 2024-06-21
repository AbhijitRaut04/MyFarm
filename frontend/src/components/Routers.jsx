import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import ProfilePage from "./ProfilePage";
import Signin from "./Signin";
import Signup from "./Signup";
import App from "../App";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
