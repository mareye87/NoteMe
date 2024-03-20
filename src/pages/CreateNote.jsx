import { useFetchGroups } from "../reactQueryCustomHooke";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authProvider";

import CreateNoteForm from "../components/CreateNoteForm";

const CreateNote = () => {
  const { user } = useAuth();
  const { data: groups, isLoading, isError } = useFetchGroups(user.email);

  if (isError) {
    return <h1>Error...</h1>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen pt-24">
      <h1 className="text-2xl mb-6 text-neutral-50 border-b border-slate-400 ">
        Create new note
      </h1>
      <CreateNoteForm groups={groups} />
    </div>
  );
};

export default CreateNote;
