import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div className="d-flex">
      <ToastContainer/>
      <Sidebar className="" />
      <Outlet className="outlet position-absolute" />
    </div>
  );
};

export default Home;
