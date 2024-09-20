import React, { useState } from "react";
import {CalendarSchedule} from "../Components/Calendar";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex mx-auto w-10/12 border-black border-2 ">
      {/* Left Side: Set Sessions */}
      <div className="flex-1 p-4 bg-white mt-10 justify-center align-middle  text-7xl font-bold">
        <div>
          <div className="">Set</div> <div>Sessions</div> on the go
        </div>
      </div>

      {/* Right Side: Calendar Schedule */}
      <div className="flex p-4  ">
        <Link to={"/schedule"}>
          <CalendarSchedule height={400}/>
        </Link>
      </div>
    </div>
  );
};
