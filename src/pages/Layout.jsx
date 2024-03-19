import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="w-full bg-slate-900">
        <section className="max-w-3xl min-h-screen mx-auto px-2 sm:px-6 bg-slate-900">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
