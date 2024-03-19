import React from "react";
import { Link, Outlet } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-slate-950 via-purple-500 to-slate-900 ">
      <div className=" text-center">
        <h1 className="text-5xl sm:text-7xl font-semibold mb-8 text-purple-950 ">
          Note<span className="text-yellow-500">Me</span>
        </h1>
        <h2 className="text-white px-6 text-lg mb-6 font-semibold">
          Log in to see all your notes or signUp to create your first NoteMe
          group
        </h2>
        <button className="text-purple-900 bg-yellow-500 px-4 py-1 rounded-md font-bold">
          <Link to="/login">Start </Link>
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default WelcomePage;
