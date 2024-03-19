import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEdit2Fill, RiDeleteBin3Fill } from "react-icons/ri";
import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import DeleteGroupModal from "./DeleteGroupModal";
import notes from "../assets/notes.png";
import groupImage from "../assets/group.png";
import trash from "../assets/trash-bin.png";
import { BsPersonCircle } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";

const GroupCard = ({ group }) => {
  const { name, emails, members, id } = group;
  const [showMembers, setShowMembers] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col justify-start shadow-lg p-2 rounded-md gap-3 border-t relative bg-purple-900 text-slate-50  ">
      {showModal && <DeleteGroupModal setShowModal={setShowModal} id={id} />}
      <div className=" border-b border-slate-500">
        <h1 className="text-2xl text-center mb-4">
          <span className="ml-1 font-semibold tracking-wider capitalize">
            {name}
          </span>
        </h1>
      </div>
      {/* OPTIONS CONTAINER */}
      <div className="flex pt-4 px-4 gap-x-5 items-center">
        {/* DELETE GROUP */}
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          {/* <RiDeleteBin3Fill className="text-red-600 text-lg"/> */}
          <img src={trash} alt="trash" className="h-5 w-7" />
        </button>
        {/* EDIT GROUP */}
        <Link to={`/dash/edit-group/${id}`}>
          <CiEdit className="text-3xl text-green-500 " />
        </Link>
        {/* MEMBERS */}
        <button
          onClick={() => {
            setShowMembers(!showMembers);
          }}
        >
          <img src={groupImage} alt="group" className="h8 w-8" />
          {/* <div className="flex items-center gap-x-2 ">
            <FaPeopleGroup className="text-3xl" />
          </div> */}
        </button>
        {/* NOTES */}
        <Link
          to={`notes/${id}`}
          className="ml-auto transition duration-150 hover:scale-105"
        >
          <img src={notes} alt="notes" className="w-12 h-12" />
        </Link>
      </div>
      {/* ---HIDDEN MEMBERS--- */}
      <div
        className={`flex gap-x-3 justify-center mt-4 overflow-hidden  transition duration-300 ${
          !showMembers ? "h-0" : "h-full"
        } `}
      >
        <div className="flex flex-col gap-2">
          {members.map((member) => {
            return (
              <div key={member} className="flex gap-3 items-center">
                <span>
                  <BsPersonCircle />
                </span>
                <p>{member}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {emails.map((email) => {
            return <p key={email}>{email}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
