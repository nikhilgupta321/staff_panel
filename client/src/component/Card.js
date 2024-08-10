import React from "react";
import { Link } from "react-router-dom";
import auth from "../helper/auth-helper";

export default function Card()  {

  const jwt = auth.isAuthenticated()
  return (
    <div className="container mt-8">
      <div className="grid  sm:grid-rows-2 md:grid-rows-3 gap-8 text-white mx-2">
        <Link
          to="attendance"
          className="p-2 w-1/3 border rounded shadow-lg flex bg-slate-500 justify-between"
        >
          <h5>Attendances</h5>
          <h5>1969</h5>
        </Link>
        <Link
          to="employee"
          className="p-2 w-1/3 border rounded shadow-lg flex bg-slate-500 justify-between"
        >
          <h5>Employee Details</h5>
          <h5>24</h5>
        </Link>
      </div>
    </div>
  );
};


