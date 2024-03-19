import React, { useEffect } from "react";

const MemberInput = ({ index, email, name }) => {
  return (
    <div className="flex flex-col gap-y-2 p-6 mt-3 mb-6 rounded-md shadow-md border-t border-slate-500  ">
      <label htmlFor={`member-${index}-name`} className="font-semibold">
        Name:
      </label>
      <input
        type="text"
        name={`member-${index}-name`}
        id={`member-${index}-name`}
        defaultValue={name}
        className=" bg-slate-300 rounded-md shadow-md outline-0 px-2 py-1"
      />
      <label htmlFor={`member-${index}-email`} className="font-semibold">
        Email:
      </label>
      <input
        type="email"
        name={`member-${index}-email`}
        id={`member-${index}-email`}
        defaultValue={email}
        className=" bg-slate-300  rounded-md shadow-md outline-0 px-2 py-1"
      />
    </div>
  );
};

export default MemberInput;
