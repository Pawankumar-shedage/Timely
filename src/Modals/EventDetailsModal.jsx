import { Button, Modal } from "flowbite-react";
import React from "react";

export const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;
  console.log("Event Details Modal", event);

  const { title, start, end, duration, attendees, eventType } = event;

  const handleSendEmail=(email)=>{
    console.log("Email",email);
    window.open(`mailto:${email}`,"_blank");
  }
  // ---------------------------------------------------------------------
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      className="pt-40 bg-gray-400 bg-opacity-10 backdrop-blur-sm"
    >
      <Modal.Header>
        <span className="p-5 ">{title}</span>
      </Modal.Header>

      {/* Body */}
      <Modal.Body className="p-10">
        <div className="space-y-4">
          <p>
            <strong>Event Type:</strong> {eventType}
          </p>
          <p>
            <strong>Start:</strong> {new Date(start).toLocaleString()}
          </p>
          <p>
            <strong>End:</strong> {new Date(end).toLocaleString()}
          </p>
          <p>
            <strong>Duration:</strong> {duration} minutes
          </p>
          <p>
            <strong>Attendees:</strong>{" "}
          </p>
          <ul>
            {attendees.map((attendee, index) => (
              <li key={index}>
                <div className="flex justify-space-between">
                  <div>{attendee.name}</div>
                  <button
                   onClick={handleSendEmail(attendee.email)}
                    className="text-white mx-5 px-2 rounded bg-gray-500"
                  >
                    Email
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-t-2 flex flex-row justify-center">
        <Button
          onClick={onClose}
          className="bg-gray-400 px-5 py-1 hover:bg-gray-500"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
