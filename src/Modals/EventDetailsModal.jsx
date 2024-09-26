import { Button, Modal } from "flowbite-react";
import React from "react";

export const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;
  console.log("Event Details Modal", event);

  const { title, start, end, duration, attendees, eventType } = event;

  const handleSendEmail = (email) => {
    console.log("Email", email);
    window.open(`mailto:${email}`, "_blank");
  };
  // ---------------------------------------------------------------------
  return (
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      class=" w-full mx-auto  bg-gray-200 bg-opacity-20 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="mt-40 mx-auto relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                // aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div class="p-4 md:p-5 space-y-4">
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
                    {/* TODO: Send email */}
                    <button
                    //  onClick={handleSendEmail(attendee.email)}
                      className="text-white mx-5 px-2 rounded bg-gray-500"
                    >
                      Email
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div class="flex justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            
            <button
              onClick={onClose}
              data-modal-hide="default-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
