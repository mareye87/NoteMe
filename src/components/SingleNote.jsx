import { format } from "date-fns";
import { RiEdit2Fill, RiDeleteBin3Fill } from "react-icons/ri";
import { FaExclamationCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteNote, useFetchSingleGroup } from "../reactQueryCustomHooke";
import { useAuth } from "./authProvider";

const SingleNote = ({ note }) => {
  const { group_member, task, priority, id, created_at, created_by } = note;

  const { deleteNote, isDeletingTaskPending } = useDeleteNote(id);

  const date = format(new Date(created_at), "dd-MM-yyyy");
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex justify-between gap-2 bg-yellow-300 rounded-md p-4 hover:scale-105 transition duration-300 relative mb-6 shadow-md">
      <h3 className="absolute -top-2 left-0 text-xs bg-red-500 px-4 rounded-sm text-white">
        For:{" "}
        <span className="font-semibold sm:text-sm capitalize">
          {group_member}
        </span>
      </h3>
      {created_by && (
        <h3 className="absolute -bottom-2 right-0 text-xs bg-purple-700 px-4 rounded-sm text-white">
          From:{" "}
          <span className="font-semibold sm:text-sm capitalize">
            {created_by[0]}
          </span>
        </h3>
      )}

      <div className="w-2/3  bg-[rgba(255,255,255,0.3)] shadow-md p-4 rounded-md relative ">
        <p className="break-word break-all sm:text-lg font-semibold mb-4">
          {task}
        </p>
        {priority && (
          <FaExclamationCircle className="text-red-500 absolute top-1 right-1" />
        )}
      </div>
      <div className="flex flex-col gap-y-4 items-end justify-center py-2 sm:text-2xl">
        <button
          onClick={() => {
            deleteNote(id);
          }}
          disabled={isDeletingTaskPending}
        >
          {created_by[1] === user.email && (
            <RiDeleteBin3Fill
              className={` ${
                isDeletingTaskPending ? "text-red-300" : "text-red-700"
              }`}
            />
          )}
        </button>
        <Link to={`/dash/edit-note/${id}`}>
          <RiEdit2Fill className="text-blue-600" />
        </Link>
        <p className="text-sm text-right">
          <span className="text-xs sm:text-base ml-2">{date}</span>
        </p>
      </div>
    </div>
  );
};

export default SingleNote;
