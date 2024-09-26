import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { EventDetailsModal } from "../Modals/EventDetailsModal";

const localizer = momentLocalizer(moment);

export const CalendarSchedule = ({ height }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent,setSelectedEvent] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);

  //fetch events from backend
  useEffect(() => {
    console.log("Exexutes only once");

    axios
      .get("http://localhost:4545/sessions/pawankumarshedage@gmail.com")
      .then((response) => {
        console.log("Events data: ", response.data);

        // Assuming the backend returns events in the correct format
        const backendEvents = response.data.map((event) => ({
          ...event,
          title: event.title,
          eventType: event.sessionType,
          start: new Date(event.start), // Convert to Date object
          end: new Date(event.end),
        }));
        setEvents(backendEvents); // Store fetched events in state
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  // Event display
  const EventComponent = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        <p>{event.eventType}</p>
        <small>{event.description}</small>
      </span>
    );
  };

  const handleSelectEvent = (event)=>{
    console.log("Selected event",event);
    setSelectedEvent(event);
    setIsModalOpen(true);

    console.log("Modal Open ",isModalOpen);
  }

  // -------------------------------------------------------------------------------------
  return (
    <div className="p-6 ">
      <h2 className="text-2xl mx-auto w-10/12  mb-4">Schedule a Session</h2>

      <Calendar
        className="w-10/12  mx-auto"
        components={{
          event: EventComponent,
        }}
        onSelectEvent={handleSelectEvent}
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: height }}
      />

      {/* Selected Event Modal */}
      {selectedEvent && (
        <EventDetailsModal 
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)} 
        event={selectedEvent}/>
      )}
    </div>
  );
};
