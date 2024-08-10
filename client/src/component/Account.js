import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import auth from "../helper/auth-helper";

export default function Account(){

  const jwt = auth.isAuthenticated()

  return (
    <div className="border-b-2">
      <div className="flex gap-2 p-2 border-b-2">
        <Link
          to="/staff"
          className="p-2  text-center rounded w-12 bg-slate-200 text-gray-900 "
        >
          <HiOutlineArrowLeft style={{ height: "20px", width: "30px" }} />
        </Link>
        <button
          type="submit"
          className="p-2  rounded w-16 bg-sky-600 text-gray-100"
        >
          Submit
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-2 mx-2 p-2 ">
        <div>
          <div className="text-xs">USERNAME</div>
          <input className={`w-full border-2 border-gray-300  `} type="text" />
        </div>
        <div>
          <div className="text-xs">NEW PASSWORD</div>
          <input className={`w-full border-2 border-gray-300  `} type="text" />
        </div>
        <div>
          <div className="text-xs">RE-ENTER PASSWORD</div>
          <input className={`w-full border-2 border-gray-300 `} type="text" />
        </div>
      </div>
    </div>
  );
};


