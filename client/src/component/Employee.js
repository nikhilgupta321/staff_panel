import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { Link } from "react-router-dom";
import auth from "../helper/auth-helper";

export default function Employee(props)  {
  const [data, setData] = useState([]);
  const employeePicture = props.employee ? props.employee.picture || "avatar.png" : "avatar.png";


  const jwt = auth.isAuthenticated()

  // Get Api
  let url = "http://localhost:3032/employee";
  const GetData = () => {
    try {
      axios.get(url).then((resp) => {
        if (resp.status === 200) {
          setData(resp.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(!jwt){
console.log("Error");
    }else{
      GetData();
    }
  }, []);
  console.log(data);
  return (
    <>
      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
            <div className="overflow-hidden ">
              <div className="flex flex-col-1">
                <div className="mx-2">
                  <Link to="/staff">
                    <button
                      type="submit"
                      className="uppercase px-4 py-1 text-white bg-green-500 rounded"
                    >
                      BACK
                    </button>
                  </Link>
                </div>
                <div className="mx-2">
                  <Link to="add">
                    <button
                      type="submit"
                      className="uppercase px-4 py-1 text-white bg-green-500 rounded"
                    >
                      ADD
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <table className="min-w-full border mt-1 text-sm border-slate-700">
              <thead className="border-b text-xs uppercase">
                <tr className="bg-gray-100">
                  <th scope="col" className="border p-2 text-xs ">
                    S.No.
                  </th>
                  <th scope="col" className="border p-2 text-xs ">
                    Photo
                  </th>
                  <th scope="col" className="border p-2 text-xs ">
                    Name
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Email
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Phone
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Father Phone
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Come Through
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Address
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Bank Details
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Join Date
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Account Details
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Resume
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    ID Proof
                  </th>
                  <th scope="col" className="border p-2 text-xs">
                    Upi Code
                  </th>
                  <th scope="col" className="border p-2 text-sm  bg-yellow-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, ind) => {
                  return (
                    <tr class="border  border-black ">
                      <td className="border p-2 text-xs ">{ind + 1}</td>
                      <td className="border p-2 text-xs "><img src={`assets/images/${employeePicture}`} /></td>
                      <td className="border p-2 text-xs ">{val.name}</td>
                      <td className="border p-2 text-xs ">{val.email}</td>
                      <td className="border p-2 text-xs ">{val.phone}</td>
                      <td className="border p-2 text-xs ">
                        {val.father_phone}
                      </td>
                      <td className="border p-2 text-xs ">
                        {val.come_through}
                      </td>
                      <td className="border p-2 text-xs ">{val.address}</td>
                      <td className="border p-2 text-xs ">
                        {val.bankdetails}
                      </td>
                      <td className="border p-2 text-xs ">
                        {val.joindate}
                      </td>
                      <td className="border text-xs">
                        <div className="flex justify-center items-center">
                          <HiOutlineDownload
                            style={{ height: "30px", width: "30px" }}
                          />
                        </div>
                      </td>
                      <td className="border text-xs ">
                        <div className="flex justify-center items-center">
                          <HiOutlineDownload
                            style={{ height: "30px", width: "30px" }}
                          />
                        </div>
                      </td>
                      <td className="border text-xs ">
                        <div className="flex justify-center items-center">
                          <HiOutlineDownload
                            style={{ height: "30px", width: "30px" }}
                          />
                        </div>
                      </td>
                      <td className="border text-xs ">
                        <div className="flex justify-center items-center">
                          <HiOutlineDownload
                            style={{ height: "30px", width: "30px" }}
                          />
                        </div>
                      </td>
                      <td className="border text-xs text-center">
                        <Link to={`${val.id}`}>EDIT</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
 
