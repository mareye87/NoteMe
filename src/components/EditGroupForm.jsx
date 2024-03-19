import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MemberInput from "../components/MemberInput";
import { useEditGroup } from "../reactQueryCustomHooke";
import Loading from "../components/Loading";
import { useAuth } from "../components/authProvider";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { toast } from "react-toastify";
import { RiDeleteBin3Fill } from "react-icons/ri";

const EditGroupForm = ({ group, id }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState(group);
  const [membersEmails, setMembersEmails] = useState(members.emails);
  const [membersNames, setMembersNames] = useState(members.members);
  const array = [];
  for (let i = 0; i < membersEmails.length; i++) {
    array.push({ name: membersNames[i], email: membersEmails[i] });
  }
  //const [inputArray, setInputArray] = useState(members.emails);
  const [inputArray, setInputArray] = useState(array);

  const [memberName, setMemberName] = useState();

  const handleRemoveMember = (email) => {
    if (email === user.email) {
      toast.error("You need to be a member of the group ");
      return;
    }
    if (!email) {
      setInputArray(inputArray.splice(-1));
    }
    setInputArray(inputArray.filter((item) => item.email !== email));
  };

  const { mutate: editGroup, isError, isLoading } = useEditGroup(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const groupName = formData.name;
    const emailsList = [];
    const namesList = [];

    console.log(formData);

    for (const [key, value] of Object.entries(formData)) {
      if (key.endsWith("email")) {
        emailsList.push(value);
      }
      if (key.startsWith("member") && key.endsWith("name")) {
        namesList.push(value);
      }
    }

    if (!emailsList.includes(user.email)) {
      toast.error("You need to be a member of the group ");
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
      editGroup(newGroup);
      navigate("/dash");
    } else {
      toast.error("check all fields please");
    }
  };

  if (isError) {
    <div className="min-h-screen py-24">
      <h1 className="text-2xl text-neutral-100 mb-6 border-b border-slate-400 ">
        Sorry, there was an error...
      </h1>
    </div>;
  }

  if (isLoading) return <Loading />;

  if (group)
    return (
      <div className="min-h-screen py-24">
        <h1 className="text-2xl text-neutral-100 mb-6 border-b border-slate-400 ">
          Edit group
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
              id="name"
              name="name"
              defaultValue={members.name}
              required
              className="bg-slate-300  rounded-md shadow-md outline-0 p-2"
            />
          </div>
          <div>
            <h3 className="uppercase text-center text-lg text-white">
              group members
            </h3>
          </div>
          {inputArray.map((member, index) => {
            return (
              <div key={index} className="relative">
                {/* <MemberInput
                  index={index}
                  email={member.email}
                  name={member.name}
                /> */}
                <div className="flex flex-col gap-y-2 p-6 mt-3 mb-6 rounded-md shadow-md border-t border-slate-500  ">
                  <label
                    htmlFor={`member-${index}-name`}
                    className="font-semibold"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    name={`member-${index}-name`}
                    id={`member-${index}-name`}
                    // defaultValue={member.name}
                    value={member.name}
                    onChange={(e) => {
                      setMemberName(e.target.value);
                    }}
                    className=" bg-slate-300 rounded-md shadow-md outline-0 px-2 py-1"
                  />
                  <label
                    htmlFor={`member-${index}-email`}
                    className="font-semibold"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    name={`member-${index}-email`}
                    id={`member-${index}-email`}
                    // defaultValue={member.email}
                    value={member.email}
                    onChange={(e) => {
                      e.target.value;
                    }}
                    className=" bg-slate-300  rounded-md shadow-md outline-0 px-2 py-1"
                  />
                </div>
                <button type="button">
                  <RiDeleteBin3Fill
                    onClick={() => {
                      handleRemoveMember(member.email);
                    }}
                    className="absolute top-3 right-3 text-red-500 text-xl"
                  />
                </button>
              </div>
            );
          })}

          {/* add member buttons */}
          <div className="flex justify-center items-center gap-x-4">
            <button
              type="button"
              onClick={() => {
                handleRemoveMember();
              }}
            >
              <CiCircleMinus className="text-4xl text-red-500 " />
            </button>
            <span>
              <FaPeopleGroup className="text-6xl " />
            </span>

            <button
              onClick={() => {
                setInputArray([...inputArray, <MemberInput />]);
              }}
              type="button"
            >
              <CiCirclePlus className="text-4xl text-blue-400" />
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-green-500 rounded-md text-slate-100 py-1 px-4 shadow-md  "
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    );
};

export default EditGroupForm;
