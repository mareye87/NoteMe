import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const Sidemenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-y-3 pt-24  p-5 h-screen bg-slate-700 text-slate-50 capitalize ">
      <Link
        to="create-note"
        state={{ groupId: "" }}
        className="px-2 py-1 w-full font-semibold"
      >
        new note
      </Link>
      <Link to="create-group" className=" px-2 py-1 font-semibold">
        create group
      </Link>
      <button
        onClick={() => {
          signOut;
          navigate("/");
        }}
        className=" px-2 py-1 font-semibold capitalize"
      >
        log out
      </button>
    </div>
  );
};

export default Sidemenu;
