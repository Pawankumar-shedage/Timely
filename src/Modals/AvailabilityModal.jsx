import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const AvailabilityModal = ({ isOpen, onClose, slotInfo }) => {
  const slotStart = new Date(slotInfo.start);
  const slotEnd = new Date(slotInfo.end);

  // console.log("SLot: ",slotInfo.slots);

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  // console.log("User info: ", user, "and loginStatus ", isLoggedIn);

  const formatLocalDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.00`;
  };

  // Handle availabilities
  const [allAvailabilities, setAllAvailabilities] = useState([]);

  const [availabilityStartTime, setAvlStartTime] = useState("09:00");
  const [availabilityEndTime, setAvlEndTime] = useState("17:00");

  const handleTime = (event) => {
    const { name, value } = event.target;
    console.log("Value: ", value);
    const [hours, minutes] = value.split(":");
    console.log("Value: ", value, "Hours, minutes ", hours, minutes);

    if (name === "start") {
      setAvlStartTime(`${hours}:${minutes}`);
    } else if (name === "end") {
      // setAvlEndTime(`${hours}:${minutes}`);

      if (
        parseInt(hours) == parseInt(availabilityStartTime.split(":")[0]) &&
        parseInt(minutes) == parseInt(availabilityStartTime.split(":")[1])
      ) {
        setSubmitDisabled(true);
        toast.error("End time can't be same as start time!");
        setAvlEndTime(availabilityStartTime); // Reset endTime to startTime if endTime is same as startTime
        return;
      }

      if (parseInt(hours) < parseInt(availabilityStartTime.split(":")[0])) {
        // console.log("End time can't be earlier than start time!",hours,availabilityStartTime.split(":")[0]);
        toast.error("End time can't be earlier than start time!");
        setAvlEndTime(availabilityStartTime); // Reset endTime to startTime if endTime is earlier

        setSubmitDisabled(true);
        return;
      }

      if (
        (parseInt(hours) === parseInt(availabilityStartTime.split(":")[0]) &&
          parseInt(minutes) > parseInt(availabilityStartTime.split(":")[1])) ||
        parseInt(hours) > parseInt(availabilityStartTime.split(":")[0])
      ) {
        setSubmitDisabled(false);
        setAvlEndTime(`${hours}:${minutes}`);
      }
    }
  };

  // add availability**
  const handleAddAvailability = async (e) => {
    e.preventDefault();

    // Availability for each day in slots[].
    for (let i = 0; i < slotInfo.slots.length; i++) {
      const slot = slotInfo.slots[i];
      console.log(slot);

      let startDateTime = formatLocalDateTime(new Date(slot)); //string
      let endDateTime = formatLocalDateTime(new Date(slot));

      const [stHours, stMinutes] = availabilityStartTime.split(":");
      const [endHours, endMinutes] = availabilityEndTime.split(":");

      // Updating time only of slot start and end
      const newStartDateTime =
        startDateTime.substring(0, 11) +
        stHours.toString().padStart(2, "0") +
        ":" +
        stMinutes.toString().padStart(2, "0") +
        startDateTime.substring(16);

      const newEndDateTime =
        endDateTime.substring(0, 11) +
        endHours.toString().padStart(2, "0") +
        ":" +
        endMinutes.toString().padStart(2, "0") +
        endDateTime.substring(16);

      //new availability with slot date . and global startTime/endTime
      const availability = {
        email: user.email,
        start: newStartDateTime,
        end: newEndDateTime,
      };

      console.log("availability: ", availability);
      // Add availability to the allAvailabilities array[].

      handleStateUpdate(availability);
    }
  };

  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const handleStateUpdate = (availability) => {
    setAllAvailabilities((prevState) => [...prevState, availability]);
    setShouldSendRequest(true);
  };

  // Post Availabilities to backend
  useEffect(() => {
    if (shouldSendRequest == true && allAvailabilities.length > 0) {
      const sendData = async () => {
        try {
          console.log("Sending Availabilities: ", allAvailabilities);
          // now push Availability[] to the db.

          const response = await axios.post(
            "http://localhost:4545/users/availability",
            allAvailabilities
          );

          if (response.status >= 200 && response.status < 300) {
            console.log("Response: ", response.data);
            toast.success("Availability added successfully");

            //clear availability arr[]
            setAllAvailabilities([]);
          } else {
            console.log("Response: ", response.data);
            toast.error("Failed to add availability,please try again");
            setAllAvailabilities([]);
          }
        } catch (error) {
          if (error.response) {
            console.log("Server Error Response: ", error.response.data);
            toast.error(
              `Error: ${
                error.response.data
                  ? error.response.data
                  : "Something went wrong"
              }`
            );
          } else {
            console.log("Unknown Error: ", error);
            toast.error("Something went wrong, please try again");
          }

          // Clear availability arr[]
          setAllAvailabilities([]);
        }
      };

      sendData();
    }
  }, [allAvailabilities, shouldSendRequest]);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  //   -----------------------------------------------------
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      // aria-hidden="true"
      className=" w-full mx-auto  bg-gray-200 bg-opacity-20 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="mt-40 mx-auto relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-2xl  text-gray-900 dark:text-white">
              Set your Availability
            </h3>

            {/* Close button */}
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 space-y-4">
            <p className="text-gray-500 dark:text-gray-400">
              Set your availability for the selected slot
            </p>

            {/* Form for selecting start and end time */}
            <form
              onSubmit={handleAddAvailability}
              className="mt-5 max-w-sm mx-auto border-2 border-gray-300 rounded-lg p-5"
            >
              <div>
                {/* 5th Sept 2024 */}
                <span>
                  From {slotStart.getDate()}-{slotStart.getMonth() + 1}-
                  {slotStart.getFullYear()} to {slotEnd.getDate() - 1}-
                  {slotEnd.getMonth() + 1}-{slotEnd.getFullYear()}
                </span>
              </div>

              <div>
                <strong>Set start and end time</strong>
                <br />
                {/* Start time */}
                <p>
                  start:
                  <span>
                    <input
                      type="time"
                      id="startTime"
                      name="start"
                      value={availabilityStartTime}
                      onChange={handleTime}
                    />
                  </span>
                </p>

                {/* End time */}
                <p>
                  end:
                  <span>
                    <input
                      type="time"
                      id="endTime"
                      name="end"
                      value={availabilityEndTime}
                      onChange={handleTime}
                    />
                  </span>
                </p>
              </div>

              <button
                type="submit"
                disabled={submitDisabled}
                id="submitAvailability"
                className={`${
                  submitDisabled ? "cursor-not-allowed" : ""
                } py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-gray-400 rounded-lg border border-gray-200 hover:bg-gray-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 `}
              >
                Submit
              </button>
            </form>
            {/* {slotInfo.slots.map((slot, index) => (
              <p key={index} className="text-gray-500 dark:text-gray-400">
                {slot[0]} 
              </p>
            ))} */}
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={onClose}
              data-modal-hide="default-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-300 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
