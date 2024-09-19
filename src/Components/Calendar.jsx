import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function CalendarSchedule() {
  const events = []; // Replace with fetched events

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Schedule a Session</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default CalendarSchedule;
