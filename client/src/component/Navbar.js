import React, { useState, useEffect } from "react";
import auth from "../helper/auth-helper";
import { Outlet } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../helper/api-auth";

export default function Navbar(props) {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();


  const handleSignOut = () => {
    auth.clearJWT(() => {
      navigate("/");
    });
  };


  useEffect(() => {
    const jwt = auth.isAuthenticated();
    if (!jwt) {
      navigate("/");   
    } else {
      verifyToken(jwt).then((data) => {
        if (data.error) {
          auth.clearJWT(() => {
            navigate("/");
          });
        } else {
          setIsLoggedIn(true);
          setUser(jwt.user);
        }
      });
    }
  }, []);

  return (
    <>
      {isLoggedIn && <div>
          <div className="fixed top-0  z-10 flex items-center justify-between w-full bg-blue-500 shadow-md h-10">
            <div className="m-2 text-xs text-slate-100">
              <div className="text-slate-100 text-xs">LOGGED IN AS {user} </div>
            </div>
            <div>
            </div>
            <div className="flex gap-2 text-xs bg-blue-500">
             <div  className="m-2 text-slate-100" >
              <Link to="/staff">
               <button> BACK </button>
              </Link>
              </div>
             <div className="m-2 text-slate-100">
              <Link to="/staff">
              <button >DASHBOARD</button>
             </Link>
             </div>
              <div className="m-2 text-slate-100">
              <Link to="account">
               <button >ACCOUNT</button>
               </Link>
              </div>
               <div className="m-2 text-slate-100">
             
              <button onClick={handleSignOut} >LOGOUT</button>
         
               </div>
               </div>
               </div>
          <div className=" pt-9 text-base">
            <Outlet />
          </div>
        </div>
      }
      </>
  );
}

// export default function Navbar(props) {
//   const [user, setUser] = useState('')
//   return (
//     <div>
//         <div className="fixed top-0  z-10 flex items-center justify-between w-full bg-blue-500 shadow-md h-10">
//           <div className="m-2 text-xs text-slate-100"><div className="text-slate-100" >LOGGED IN AS {user} </div></div>
//           <div>
//           </div>
//           <div className="flex gap-2 text-xs bg-blue-500">
//             <div  className="m-2 text-slate-100" >
//               <Link to="/staff">
//               <button> BACK </button>
//               </Link>
//               </div>
//             <div className="m-2 text-slate-100">
//               <Link to="/staff">
//               <button >DASHBOARD</button>
//               </Link>
//               </div>
//               <div className="m-2 text-slate-100">
//               <Link to="/staff/account">
//               <button >ACCOUNT</button>
//               </Link>
//               </div>
//               <div className="m-2 text-slate-100">
//               <Link to="/">
//               <button >LOGOUT</button>
//               </Link>
//               </div>
//           </div>
//         </div>
//         <div className=" pt-9    text-base">
//           <Outlet />
//         </div>
//       </div>
//   )
// }
