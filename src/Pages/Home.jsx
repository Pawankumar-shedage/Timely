import React, { useState } from "react";
import CalendarSchedule from "../Components/Calendar";

const Home = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

        {/* 1.Navbar */}

        {/* 2.base calendar overview */}

      <CalendarSchedule/>
    </div>
  );
};
export default Home;
