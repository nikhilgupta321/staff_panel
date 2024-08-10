import axios from "axios";
import React, { useEffect, useState } from "react";
import auth from "../helper/auth-helper";

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

export default function AttendanceTracker() {
  const [employeeData, setEmployeeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const jwt = auth.isAuthenticated();

  let employeeUrl = "http://localhost:3032/employee";
  const getEmployeeData = () => {
    try {
      axios.get(employeeUrl).then((resp) => {
        if (resp.status === 200) {
          setEmployeeData(resp.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let attendanceUrl = "http://localhost:3032/attendance";
  const getAttendanceData = () => {
    try {
      axios.get(attendanceUrl).then((resp) => {
        if (resp.status === 200) {
          setAttendanceData(resp.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeData();
    getAttendanceData();
  }, []);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setSelectedMonth(newMonth);
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear);
  };

  const handleFetchData = async () => {
    const fetchDataUrl = `${attendanceUrl}?year=${selectedYear}&month=${
      selectedMonth + 1
    }`;

    try {
      const response = await axios.get(fetchDataUrl);

      if (response.status === 200) {
        setAttendanceData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMonths = () => {
    return Array.from({ length: 12 }, (_, index) => ({
      value: index,
      label: new Date(0, index).toLocaleString("en-US", { month: "long" }),
    }));
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5; // Change this range if needed
    return Array.from({ length: 12 }, (_, index) => ({
      value: startYear + index,
      label: startYear + index,
    }));
  };

  const months = getMonths();
  const years = getYears();
  const totalDays = daysInMonth(selectedYear, selectedMonth);

  const handleShowImage = (upiCode) => {
    const imageUrl = getEmployeeImage(upiCode);

    window.open(imageUrl, "_blank");
  };

  const getEmployeeImage = (upiCode) => {
    return `http://localhost:3032/${upiCode}.jpg`;
  };

  return (
    <div className="overflow-x-auto sm:-mx-8 lg:mx-auto">
      <div className="p-2">
        <select
          className="border p-1 rounded "
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <select
          className="mx-1 p-1 border rounded "
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
        <button
          className="mx-1 p-1 border rounded bg-gray-200"
          onClick={handleFetchData}
        >
          FETCH
        </button>
      </div>
      <table className="table-auto border-collapse  w-full">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th scope="col" className="border p-1 text-center ">
              S.No
            </th>
            <th
              scope="col"
              className="border p-1 text-left"
              style={{ width: "10%" }}
            >
              Name
            </th>
            <th
              scope="col"
              className="border p-1 text-left"
              style={{ width: "8%" }}
            >
              UPI
            </th>
            <th
              scope="col"
              className="border p-1 text-center"
              style={{ width: "8%" }}
            >
              Total Salary
            </th>
            <th
              scope="col"
              className="border p-1 text-right"
              style={{ width: "8%" }}
            >
              Salary/Day
            </th>
            <th
              scope="col"
              className="border p-1 text-center"
              style={{ width: "8%" }}
            >
              Payable Salary
            </th>
            <th
              scope="col"
              className="border p-1 text-center"
              style={{ width: "8%" }}
            >
              UPI Code
            </th>
            {[...Array(totalDays)].map((_, dayIndex) => (
              <th
                key={dayIndex}
                className={`border p-2 ${
                  new Date(
                    selectedYear,
                    selectedMonth,
                    dayIndex + 1
                  ).getDay() === 0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {new Date(
                  selectedYear,
                  selectedMonth,
                  dayIndex + 1
                ).getDay() === 0
                  ? "S"
                  : dayIndex + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employeeData
            .filter((val) => val.resign === "N")
            .map((val, ind) => {
              const totalSalary = val.basicsalary;
              const salaryPerDay = totalSalary / totalDays;
              let payableSalary = 0;

              [...Array(totalDays)].forEach((_, dayIndex) => {
                const currentDate = new Date(
                  selectedYear,
                  selectedMonth,
                  dayIndex + 1
                );
                const formattedDate = currentDate.toISOString().split("T")[0];
                const isSunday = currentDate.getDay() === 0;

                const attendanceEntry = attendanceData.find(
                  (entry) => entry.id === val.id && entry.date === formattedDate
                );

                // Default to absent
                let attendanceStatus = "A";

                // If attendance entry exists, update attendance status
                if (attendanceEntry) {
                  attendanceStatus = attendanceEntry.status;
                } else if (isSunday) {
                  attendanceStatus = "P"; // Mark as present for Sundays without attendance
                }

                // Update payableSalary based on attendance status
                switch (attendanceStatus) {
                  case "P":
                    payableSalary += salaryPerDay;
                    break;
                  case "H":
                    payableSalary += salaryPerDay / 2;
                    break;
                  case "A":
                    // Do nothing for "Absent" status
                    break;
                  default:
                    break;
                }
              });

              return (
                <tr key={ind}>
                  <td className="border p-1 text-center">{ind + 1}</td>
                  <td className="border p-1">{val.name}</td>
                  <td className="border p-1">
                    <button
                      onClick={() => handleShowImage(val.upiCode)}
                      className=" rounded w-12 bg-sky-600 text-gray-100"
                    >
                      Show
                    </button>
                  </td>
                  <td className="border p-1 text-center">{totalSalary}</td>
                  <td className="border p-1 text-right">
                    {salaryPerDay.toFixed(2)}
                  </td>
                  <td className="border p-1 text-center">
                    {payableSalary.toFixed(2)}
                  </td>
                  <td className="border p-1">
                    <button
                      onClick={() => handleShowImage(val.upiCode)}
                      className=" rounded w-12 bg-sky-600 text-gray-100"
                    >
                      Show
                    </button>
                  </td>
                  {[...Array(totalDays)].map((_, dayIndex) => {
                    const currentDate = new Date(
                      selectedYear,
                      selectedMonth,
                      dayIndex + 1
                    );
                    const formattedDate = currentDate
                      .toISOString()
                      .split("T")[0];

                    const isSunday = currentDate.getDay() === 0;

                    const attendanceEntry = attendanceData.find(
                      (entry) =>
                        entry.id === val.id && entry.date === formattedDate
                    );
                    // Update payableSalary based on attendance status
                    const attendanceStatus = attendanceEntry
                      ? attendanceEntry.status
                      : isSunday
                      ? "A"
                      : "";

                    return (
                      <td
                        key={dayIndex}
                        className={`border p-2 ${
                          isSunday ? "text-red-500" : ""
                        }`}
                      >
                        <div style={{ width: "fit-content" }}>
                        <input
                          type="text"
                          value={attendanceStatus}
                          onChange={(e) => {
                            const newValue = e.target.value.toUpperCase();
                            if (["P", "A", "H"].includes(newValue)) {
                              // Update the local state immediately
                              const newAttendanceData = [...attendanceData];
                              const existingEntryIndex = newAttendanceData.findIndex(
                                (entry) =>
                                  entry.id === val.id && entry.date === formattedDate
                              );
                              if (existingEntryIndex !== -1) {
                                newAttendanceData[existingEntryIndex].status = newValue;
                              } else {
                                newAttendanceData.push({
                                  id: val.id,
                                  date: formattedDate,
                                  status: newValue,
                                });
                              }
                              setAttendanceData(newAttendanceData);

                              // Post the updated attendance data to the backend
                              axios.post(attendanceUrl, {
                                id: val.id,
                                date: formattedDate,
                                status: newValue,
                              }).then((response) => {
                                console.log("Attendance data posted successfully:", response.data);
                              }).catch((error) => {
                                console.error("Error posting attendance data:", error);
                              });
                            }
                          }}
                            style={{ width: "100%" }} // Set input width to 100% of parent container
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
