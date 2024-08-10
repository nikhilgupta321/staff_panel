import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineArrowLeft } from "react-icons/hi";
import auth from "../helper/auth-helper";

export default function EditEmployee() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    father_phone: "",
    come_through: "",
    address: "",
    bankdetails: "",
    joindate: "",
    accountdetails: null,
    photo: null,
    idproof: null,
    upicode: null,
    basicsalary: "",
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3032/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt.token}`,
            },
          }
        );

        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id, jwt.token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("father_phone", formData.father_phone);
      formDataToSend.append("come_through", formData.come_through);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("bankdetails", formData.bankdetails);
      formDataToSend.append("joindate", formData.joindate);
      formDataToSend.append("basicsalary", formData.basicsalary);

      formDataToSend.append("accountdetails", formData.accountdetails);
      formDataToSend.append("photo", formData.photo);
      formDataToSend.append("idproof", formData.idproof);
      formDataToSend.append("upicode", formData.upicode);

      console.log("FormDataToSend:", formDataToSend);

      const response = await axios
        .put(`http://localhost:3032/employee/${id}`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          alert("Edit Successfully");
        });

      console.log("Server response:", response);
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
            className="p-2  text-center rounded w-12 bg-slate-200 text-gray-900"
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
}
