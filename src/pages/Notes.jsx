import React from "react";
import {
  useFetchGroups,
  useFetchNotes,
  useFetchSingleGroup,
} from "../reactQueryCustomHooke";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SingleNote from "../components/SingleNote";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const Notes = () => {
  const { id } = useParams();

  const { data: notes, isError, isLoading } = useFetchNotes(+id);
  const {
    isLoading: isGroupLoading,
    isError: isGroupError,
    data: group,
  } = useFetchSingleGroup(id);

  if (isError || isGroupError) {
    return (
      <div className="min-h-screen pt-24 grid gap-y-4 pb-8">
        <h1>Sorry, there was an error...</h1>
      </div>
    );
  }
  if (isLoading || isGroupLoading) {
    return (
      <div className="min-h-screen pt-24 grid gap-y-4 pb-8">
        <Loading />
      </div>
    );
  }

  if (notes.length < 1) {
    return (
      <div className="min-h-screen pt-24 pb-8   ">
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <h1 className="text-xl sm:text-2xl text-white">
            There are no notes for this group
          </h1>
          <Link
            to="/dash/create-note"
            state={{ groupId: id }}
            className="text-center text-green-600 text-4xl sm:text-2xl hover:rotate-180 transition duration-300"
          >
            <FaCirclePlus />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 ">
      <div className="flex justify-center items-center gap-x-10 mb-10 text-xl text-slate-50 font-semibold text-center bg-purple-900 py-2 rounded-md">
        <h1 className=" ">
          Notes for: <span>{group.name}</span>
        </h1>
        <Link
          to="/dash/create-note"
          state={{ groupId: id }}
          className="text-center text-green-600 text-3xl  hover:rotate-180 transition duration-300"
        >
          <FaCirclePlus />
        </Link>
      </div>

      <div className="grid gap-y-4 pb-8">
        {notes.map((note) => {
          return <SingleNote key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
