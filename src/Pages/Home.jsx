import React, { useState } from "react";
import { CalendarSchedule } from "../Components/Calendar";
import { Link } from "react-router-dom";
import { HomeCalendarDemo } from "../Components/HomeCalendarDemo";

export const Home = () => {
  return (
    <div className="flex flex-col w-10/12 mt-28 mx-auto sm:flex sm:flex-row sm:mx-auto sm:w-10/12 ">
      {/* Left Side: Set Sessions */}
      <div className="w-full flex-1 p-4 bg-white mt-10 justify-center align-middle text-3xl sm:text-7xl md:font-bold">
        <div className=" sm:mt-5">
          <div className="">Set</div> 
          <div>Sessions</div>
           on the go
        </div>
      </div>

      {/* Right Side: Calendar Schedule */}
      <div className="flex p-4 ">
        <Link to={"/"}>
          <HomeCalendarDemo height={400}  />
        </Link>
      </div>
    </div>
  );
};
