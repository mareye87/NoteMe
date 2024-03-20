import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { useEditNote, useFetchGroups } from "../reactQueryCustomHooke";
import Loading from "../components/Loading";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useAuth } from "../components/authProvider";
import { toast } from "react-toastify";

const EditNoteForm = ({ note, groups }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log(note.priority);

  const { editNote, isEditNotePending } = useEditNote(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (formData.group_id === null || formData.group_id === "select group") {
      toast.error("You need to select group");
      return;
    }
    if (formData.task === null || formData.task === " ") {
      toast.error("You need to add text to your note");
      return;
    }
    editNote(formData);
    navigate(`/dash/notes/${formData.group_id}`);
  };

  let optValue;

  const handleOptionChange = (e) => {
    optValue = +e.target.value;
    setCurrentIndex(groups.findIndex((group) => group.id === optValue));
  };

  if (note && groups)
    return (
      <div className="min-h-screen pt-24">
        <h1 className="text-2xl mb-6 text-neutral-50 border-b border-slate-400 ">
          Edit note
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-purple-900 shadow-md rounded-md p-4 border-t"
        >
          {/* select group */}
          <div className="flex flex-col mb-4 gap-y-2">
            <label htmlFor="group_id" className="font-semibold text-white">
              Note for:
            </label>
            <select
              name="group_id"
              id="group_id"
              required
              defaultValue={note.group_id}
              onChange={handleOptionChange}
              className="bg-slate-100 rounded-md outline-0 p-2 w-1/2 sm:w-1/3 "
            >
              <option value={" "}>{"select group"}</option>
              {groups.map((group) => {
                return (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* note text */}
          <div className="flex flex-col mb-4 gap-y-2">
            <label htmlFor="task" className="font-semibold text-white">
              Note:
            </label>
            <textarea
              name="task"
              id="task"
              defaultValue={note.task}
              required
              minLength={3}
              className="bg-slate-100 rounded-md outline-0 p-2"
            />
          </div>
          {/* select member */}
          <div className="flex flex-col mb-4 gap-y-2">
            <label htmlFor="group_member" className="font-semibold text-white">
              Member:
            </label>
            <select
              name="group_member"
              id="group_member"
              defaultValue={note.group_member}
              className="bg-slate-100 rounded-md outline-0 p-2 w-1/2 sm:w-1/3 "
            >
              <option value="all">All</option>

              {groups[currentIndex].members.map((member) => {
                return (
                  <option key={member} value={member}>
                    {member}
                  </option>
                );
              })}
            </select>
          </div>
          {/* priority */}
          <div className="flex items-center gap-x-3">
            <label htmlFor="priority" className="font-semibold text-white">
              Priority
            </label>
            <input
              type="checkbox"
              name="priority"
              defaultChecked={note.priority}
            />
          </div>
          {/* submit */}
          <button
            disabled={isEditNotePending}
            className="mt-6 bg-green-600 rounded-md text-slate-100 py-1 px-4 shadow-md w-full "
          >
            {!isEditNotePending ? "Confirm" : "Submitting"}
          </button>
        </form>
      </div>
    );
};

export default EditNoteForm;
