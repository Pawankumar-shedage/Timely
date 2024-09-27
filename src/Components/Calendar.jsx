import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { EventDetailsModal } from "../Modals/EventDetailsModal";
import { AvailabilityModal } from "../Modals/AvailabilityModal";
import { InfoModal } from "../Modals/InfoModal";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);


// /events
export const CalendarSchedule = ({ height }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent,setSelectedEvent] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [selectedSlot,setSelectedSlot] = useState(null);
  const [isAvailabilityModalOpen,setIsAvailabilityModalOpen] = useState(false);
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

  const handleSelectSlot=(slot)=>{
    console.log("Selected slot",slot);
    // Send this slot to availability modal.
    setSelectedSlot(slot);
    setIsAvailabilityModalOpen(true);

  }

  const handleCloseSlotModal=()=>{
    setIsAvailabilityModalOpen(false);
  }

  // -------------------------------------------------------------------------------------
  return (
    <div className="p-6 ">
      {/* For users */}
      <div className="w-10/12 mx-auto mb-2  flex justify-between">
        <h2 className="text-2xl   mb-4">Upcoming Events</h2>
        {/* Availability btn */}
        <button
          onClick={() => toast.info("Select day(s) to set availability")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold  h-10/12 py-2  my-auto px-4 rounded-2xl"
        >
          Set Availability
        </button>
      </div>
      

      <Calendar
        className="w-10/12  mx-auto"
        components={{
          event: EventComponent,
        }}
        selectable
        onSelectEvent={handleSelectEvent}
        events={events}
        localizer={localizer}
        onSelectSlot={handleSelectSlot}
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

      {/* Availability Modal */}
      {isAvailabilityModalOpen &&(

        <AvailabilityModal isOpen={isAvailabilityModalOpen} onClose={handleCloseSlotModal} slotInfo={selectedSlot}/>
      )}

      
    </div>
  );
};
