import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiOutlineArrowLeft } from "react-icons/hi";
import auth from "../helper/auth-helper";

export default function AddEmployee(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",  
    father_phone: "",
    come_through: "",
    address: "",
    bankdetails: "",
    joindate: "",
    accountdetails: "",
    photo: "",
    idproof: "",
    upicode: "",
    basicsalary: "",
  });

  const jwt = auth.isAuthenticated()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post(
        "http://localhost:3032/employee",
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data", // Set Content-Type to 'multipart/form-data'
          },
        }
      );


      console.log("Server response:", response.data);
      

      
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="border-b-2">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 p-2 border-b-2">
          <Link
            to="/staff/employee"
            className="p-1  text-center rounded w-12 bg-slate-200 text-gray-900"
          >
            <HiOutlineArrowLeft 
              style={{ height: "20px", width: "40px" }}
            />
          </Link>

          <button
            type="submit"
            className="p-1  rounded w-16 bg-sky-600 text-gray-100"
          >
            Submit
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4 mx-2 mb-2 text-xs">
          <div>
            <div>NAME</div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            />
          </div>
          <div>
            <div>EMAIL</div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            />
          </div>
          <div>
            <div>PHONE</div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            />
          </div>
          <div>
            <div>FATHER PHONE</div>
            <input
              name="father_phone"
              value={formData.father_phone}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            ></input>
          </div>
          <div>
            <div>COME THROUGH</div>
            <input
              name="come_through"
              value={formData.come_through}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            ></input>
          </div>
          <div>
            <div>ADDRESS</div>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            ></input>
          </div>
          <div>
            <div>BANK DETAILS</div>
            <input
              name="bankdetails"
              value={formData.bankdetails}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            ></input>
          </div>
          <div>
            <div>JOIN DATE</div>
            <input
              name="joindate"
              value={formData.joindate}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            ></input>
          </div>
          <div>
            <div>ACCOUNT DETAILS</div>
            <input
              name="accountdetails"
              value={formData.accountdetails}
              onChange={handleChange}
              type="file"
              accept="file/*"
              className={`w-full bg-white border-2 border-gray-300 p-2 file:rounded file:border-0 file:bg-gray-300 file:text-black-300`}
            />
          </div>
          <div>
            <div>PHOTO</div>
            <input
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              type="file"
              accept="file/*"
              className={`w-full bg-white border-2 border-gray-300 p-2 file:rounded file:border-0 file:bg-gray-300 file:text-black-300`}
            />
          </div>
          <div>
            <div>ID PROOF</div>
            <input
              name="idproof"
              value={formData.idproof}
              onChange={handleChange}
              type="file"
              accept="file/*"
              className={`w-full bg-white border-2 border-gray-300 p-2 file:rounded file:border-0 file:bg-gray-300 file:text-black-300`}
            />
          </div>
          <div>
            <div>UPI CODE</div>
            <input
              name="upicode"
              value={formData.upicode}
              onChange={handleChange}
              type="file"
              accept="file/*"
              className={`w-full bg-white border-2 border-gray-300 p-2 file:rounded file:border-0 file:bg-gray-300 file:text-black-300`}
            />
          </div>
          <div>
            <div>BASIC SALARY</div>
            <input
              name="basicsalary"
              value={formData.basicsalary}
              onChange={handleChange}
              autoComplete="off"
              className={`w-full border-2 border-gray-300 p-2 focus:outline-emerald-600`}
              type="text"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};


