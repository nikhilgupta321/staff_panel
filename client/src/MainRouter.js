import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Card from "./component/Card";
import Employee from "./component/Employee";
import AddEmployee from "./component/AddEmployee";
import AttendanceTracker from "./component/Month";
import EditEmployee from "./component/EditEmployee";
import Account from "./component/Account";  

function MainRouter() {
  return (
    <div className="MainRouter">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/staff/" element={<Navbar />}>
          <Route index element={<Card />} />
          <Route path="employee" element={<Employee />} />
          <Route path="account" element={<Account />} />
          <Route path="attendance" element={<AttendanceTracker />} />
          <Route path="employee/add" element={<AddEmployee />} />
          <Route path="employee/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
    </div>
  );
}

export default MainRouter;