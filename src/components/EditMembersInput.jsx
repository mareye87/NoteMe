import { useState } from "react";

const EditMemberInput = ({ index, membersNames, membersEmails }) => {
  return (
    <div className="flex flex-col gap-y-2 p-6 mt-3 mb-6 rounded-md shadow-md border-t border-slate-500  ">
      <label htmlFor="name" className="font-semibold">
        Name:
      </label>
      <input
        type="text"
        value={membersNames[index]}
        className=" bg-slate-300 rounded-md shadow-md outline-0 px-2 py-1"
      />
      <label htmlFor="email" className="font-semibold">
        Email:
      </label>
      <input
        type="email"
        value={membersEmails[index]}
        className=" bg-slate-300  rounded-md shadow-md outline-0 px-2 py-1"
      />
    </div>
  );
};

export default EditMemberInput;
