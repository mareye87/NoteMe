import { useState } from "react";
import { useAuth } from "../components/authProvider";
import { useFetchGroups } from "../reactQueryCustomHooke";
import ErrorPage from "./ErrorPage";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import GroupCard from "../components/GroupCard";
import DeleteGroupModal from "../components/DeleteGroupModal";

const HomePage = () => {
  const { user } = useAuth();
  const { data: groups, isLoading, isError } = useFetchGroups(user.email);

  if (isError) {
    return <h1>Sorry, there was an error</h1>;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-24">
      <h1 className="text-xl text-slate-800 font-semibold text-center bg-yellow-400 py-2 rounded-md">
        Your <span className="font-bold mx-1 ">NoteMe</span> Groups
      </h1>
      <div className="mt-10 ">
        {groups ? (
          <>
            <div
              className={`grid gap-6 ${groups.length > 1 && "sm:grid-cols-2"} `}
            >
              {groups.map((group) => {
                return (
                  <div key={group.id}>
                    <GroupCard group={group} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mt-6 bg-green-200 text-white">
            <h1>You don't have any groups yet</h1>
            <Link to="create-group">Create new NoteMe Group</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
