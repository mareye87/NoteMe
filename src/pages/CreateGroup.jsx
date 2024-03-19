import React, { useState } from "react";
import { useNavigate } from "react-router";
import MemberInput from "../components/MemberInput";
import { useCreateGroup } from "../reactQueryCustomHooke";
import Loading from "../components/Loading";
import { useAuth } from "../components/authProvider";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { toast } from "react-toastify";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [membersAmount, setMemberAmount] = useState(1);
  const inputsArray = Array.from({ length: membersAmount });

  const { mutate: createGroup, isError, isPending, error } = useCreateGroup();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const groupName = formData.name;
    const emailsList = [];
    const namesList = [];

    for (const [key, value] of Object.entries(formData)) {
      if (key.endsWith("email")) {
        emailsList.push(value);
      }
      if (key.startsWith("member") && key.endsWith("name")) {
        namesList.push(value);
      }
    }

    if (!emailsList.includes(user.email)) {
      toast.error("You can't create group without you as member ");
      return;
    }

    if (
      groupName !== " " &&
      emailsList.length > 0 &&
      namesList.length > 0 &&
      !emailsList.includes("") &&
      !namesList.includes("") &&
      emailsList.includes(user.email)
    ) {
      const newGroup = {
        name: groupName,
        emails: emailsList,
        members: namesList,
      };
      createGroup(newGroup);
      navigate("/dash");
    } else {
      toast.error("check all fields please");
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen pt-24">
        <h1>There was an error...</h1>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen pt-24">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <h1 className="text-2xl text-neutral-100 mb-6 border-b border-slate-400 ">
        Create new group
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-purple-900 shadow-md rounded-md p-4 border-t"
      >
        <div className="flex flex-col mb-6 gap-y-2">
          <label htmlFor="name" className="font-semibold text-white">
            Group name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="bg-slate-300  rounded-md shadow-md outline-0 p-2"
          />
        </div>
        <div>
          <h3 className="uppercase text-center text-lg text-white">
            group members
          </h3>
        </div>
        {inputsArray.map((input, index) => {
          return <MemberInput key={index} index={index} />;
        })}
        {/* add member buttons */}
        <div className="flex justify-center items-center gap-x-4">
          <button
            onClick={() => {
              setMemberAmount(membersAmount - 1);
            }}
            type="button"
          >
            <CiCircleMinus className="text-4xl text-red-500 " />
          </button>
          <span>
            <FaPeopleGroup className="text-6xl " />
          </span>

          <button
            onClick={() => {
              setMemberAmount(membersAmount + 1);
            }}
            type="button"
          >
            <CiCirclePlus className="text-4xl text-blue-400" />
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-green-500 rounded-md text-slate-100 py-1 px-4 shadow-md  "
        >
          {isPending ? "Pending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
