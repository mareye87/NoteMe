import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../components/Loading";
import { useAuth } from "../components/authProvider";
import { useFetchSingleGroup } from "../reactQueryCustomHooke";
import EditGroupForm from "../components/EditGroupForm";

const EditGroup = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isLoading, data: group, isError, error } = useFetchSingleGroup(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="min-h-screen py-24">
        <h1 className="text-2xl text-neutral-100 mb-6 border-b border-slate-400 ">
          There was an error , from EditGroup
        </h1>
      </div>
    );
  }

  if (group) {
    return <EditGroupForm group={group} id={id} />;
  }
};

export default EditGroup;
