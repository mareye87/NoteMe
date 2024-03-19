import { Link, useParams } from "react-router-dom";
import { useDeleteGroup } from "../reactQueryCustomHooke";

const DeleteGroupModal = ({ setShowModal, id }) => {
  const { deleteGroup, isDeletingGroupPending, error } = useDeleteGroup();

  return (
    <div className="fixed top-0 left-0 h-screen w-full grid place-items-center bg-slate-800 opacity-90 z-50  ">
      <div className="flex flex-col justify-center items-center bg-slate-200 w-3/4  max-w-xl py-16 rounded-lg">
        <h1 className=" font-semibold text-lg text-center text-black px-4 text-balance">
          {error?.code === "23503"
            ? "There are still notes in this group. Delete all notes in order to delete group"
            : " Are you sure, you want to delete this group?"}
        </h1>
        <div className="mt-8 px-8 w-full flex justify-around items-center">
          <button
            onClick={() => {
              deleteGroup(id);
            }}
            className="text-red-500 font-bold text-lg"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            <h3 className="text-green-500 font-bold text-lg">Leave</h3>
          </button>
        </div>
        {isDeletingGroupPending && <p>Deleting...</p>}
      </div>
    </div>
  );
};

export default DeleteGroupModal;
