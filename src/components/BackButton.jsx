import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ path }) => {
  return (
    <button className="bg-green-400 rounded-md px-2 py-1 text-white">
      <Link to={path}>Back</Link>
    </button>
  );
};

export default BackButton;
