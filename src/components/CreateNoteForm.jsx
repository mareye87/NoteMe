import { useState } from "react";
import { useCreateNewNote, useFetchGroups } from "../reactQueryCustomHooke";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authProvider";
import { toast } from "react-toastify";

const CreateNoteForm = ({ groups }) => {
  const { createNote, isCreateNotePending } = useCreateNewNote();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useLocation();

  const [currentIndex, setCurrentIndex] = useState(
    state.groupId ? groups.findIndex((group) => group.id === +state.groupId) : 0
  );

  const authorIndex = groups[currentIndex].emails.findIndex(
    (email) => email === user.email
  );
  const author = [groups[currentIndex].members[authorIndex], user.email];

  const handleOptionChange = (e) => {
    state.groupId = +e.target.value;
    setCurrentIndex(groups.findIndex((group) => group.id === state.groupId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (formData.group_id === null || !formData.group_id) {
      toast.error("You need to select group");
      return;
    }
    if (formData.task === null || formData.task === " ") {
      toast.error("You need to add text to your note");
      return;
    }

    createNote({
      ...formData,
      created_by: author,
    });

    navigate(`/dash/notes/${formData.group_id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-900 shadow-md rounded-md p-4 border-t"
    >
      {/* select group */}
      <div className="flex flex-col mb-4 gap-y-2">
        <label htmlFor="group_id" className="font-semibold">
          Note for:
        </label>
        <select
          name="group_id"
          id="group_id"
          required
          defaultValue={state.groupId ? state.groupId : 0}
          onChange={handleOptionChange}
          className="bg-slate-300 rounded-md outline-0 p-2 w-1/2 sm:w-1/3 "
        >
          <option value={0} disabled>
            {"select group"}
          </option>
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
        <label htmlFor="task" className="font-semibold">
          Note:
        </label>
        <textarea
          name="task"
          id="task"
          required
          className="bg-slate-300 rounded-md outline-0 p-2"
        />
      </div>
      {/* select member */}
      <div className="flex flex-col mb-4 gap-y-2">
        <label htmlFor="group_member" className="font-semibold">
          Member:
        </label>
        <select
          name="group_member"
          id="group_member"
          className="bg-slate-300 rounded-md outline-0 p-2 w-1/2 sm:w-1/3 "
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
        <label htmlFor="priority" className="font-semibold">
          Priority
        </label>
        <input type="checkbox" name="priority" />
      </div>
      {/* submit */}
      <button
        disabled={isCreateNotePending}
        className="mt-6 bg-green-600 rounded-md text-slate-100 py-1 px-4 shadow-md w-full "
      >
        {!isCreateNotePending ? "Add Note" : "Submitting"}
      </button>
    </form>
  );
};

export default CreateNoteForm;
