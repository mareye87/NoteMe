import { useFetchGroups, useFetchSingleNote } from "../reactQueryCustomHooke";
import Loading from "../components/Loading";
import { useAuth } from "../components/authProvider";
import EditNoteForm from "../components/EditNoteForm";
import { useParams } from "react-router-dom";

const editNote = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: groups, isLoading, isError } = useFetchGroups(user.email);
  const {
    data: note,
    isLoading: isNoteLoading,
    isError: isNoteError,
  } = useFetchSingleNote(id);

  if (isError || isNoteError) {
    return (
      <div className="min-h-screen pt-24">
        <h1 className="text-2xl text-white mb-6 border-b border-slate-400 ">
          Sorry, there was an error...
        </h1>
      </div>
    );
  }
  if (isLoading || isNoteLoading) {
    return <Loading />;
  }

  return <EditNoteForm note={note} groups={groups} />;
};

export default editNote;
