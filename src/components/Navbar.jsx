import React, { useState } from "react";
import { useAuth } from "./authProvider";
import { Link } from "react-router-dom";
import { HiOutlineBars4 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { useFetchGroups } from "../reactQueryCustomHooke";
import Sidemenu from "./Sidemenu";
import Loading from "./Loading";

const Navbar = () => {
  const { signOut } = useAuth();

  const { data: groups, isLoading, isError } = useFetchGroups();

  const [showAside, setShowAside] = useState(true);

  if (isError) {
    return <h1>Loading...</h1>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950 z-20">
      <div className="max-w-3xl h-16 px-2 sm:px-6 mx-auto flex items-center justify-between  text-slate-100 ">
        <Link
          to="/dash"
          onClick={() => {
            setShowAside(true);
          }}
          className="bg-purple-900  px-8 py-1 rounded-md  text-slate-50 font-semibold"
        >
          Home
        </Link>
        {/* hamburger */}
        <button
          onClick={() => {
            setShowAside(!showAside);
          }}
          className=" z-30"
        >
          {!showAside ? (
            <LiaTimesSolid className="text-3xl pointer sm:hidden" />
          ) : (
            <HiOutlineBars4 className="text-3xl pointer sm:hidden" />
          )}
        </button>

        {/* menu links */}
        <div className="hidden  sm:flex gap-x-4 ">
          {groups && (
            <Link
              to="create-note"
              state={{ groupId: "" }}
              className="bg-purple-900 px-2 py-1 rounded-md text-sm text-slate-50 font-semibold"
            >
              new note
            </Link>
          )}

          <Link
            to="create-group"
            className="bg-purple-900 px-2 py-1 rounded-md text-sm text-slate-50 font-semibold"
          >
            create Group
          </Link>
          <button
            onClick={signOut}
            className="bg-purple-900 px-2 py-1 rounded-md text-sm text-slate-50 font-semibold"
          >
            log out
          </button>
        </div>
        {/* sidemenu */}
        <aside
          onClick={() => {
            setShowAside(!showAside);
          }}
          className={`absolute top-0 right-0  transition duration-300 ${
            showAside && "translate-x-full"
          }`}
        >
          <Sidemenu />
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
