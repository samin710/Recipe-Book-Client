import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-11/12 md:max-w-10/11 mx-auto">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MainLayout;
