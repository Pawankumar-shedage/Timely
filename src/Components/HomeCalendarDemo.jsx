import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);
export const HomeCalendarDemo = ({height,width}) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        className=" w-11/12 mx-auto md:h-56 lg:h-64 "
        style={{ height: height }}
      />
    </div>
  );
};
