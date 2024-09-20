import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const events = [
  {
    id: 0,
    title: 'Event 1',
    start: moment("2024-09-21T15:22:30").toDate(),   // September 11, 2024, 2:00 PM
    end: moment("2024-09-21T15:23:30").toDate(),     // September 11, 2024, 4:00 PM
  },
  {
    id: 1,
    title: 'Event 2',
    start: moment("2024-09-20T15:21:30").toDate(),   // September 11, 2024, 2:00 PM
    end: moment("2024-09-20T16:00:00").toDate(),     // September 11, 2024, 4:00 PM
  },
  {
    id: 3,
    title: 'Event 3',
    start: moment("2024-09-20T15:00:00").toDate(),   // September 11, 2024, 2:00 PM
    end: moment("2024-09-20T15:21:00").toDate(),     // September 11, 2024, 4:00 PM
  },
]; 

const localizer = momentLocalizer(moment);

export const CalendarSchedule= ({height}) =>{

  //fetch events from backend
  
  return (
    <div className="p-6 ">
      <h2 className="text-2xl mx-auto w-10/12  mb-4">Schedule a Session</h2>

      
      <Calendar
        className="w-10/12  mx-auto" 
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: height}}
      />
    </div>
  );
}

