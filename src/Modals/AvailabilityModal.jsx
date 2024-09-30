import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const AvailabilityModal = ({ isOpen, onClose, slotInfo }) => {
  console.log("SLot: Start: ", slotInfo.start," End:", slotInfo.end);
  const slotStart = new Date(slotInfo.start);
  const startDay = slotStart.getDay();
  const startTime = slotStart.getTime();
  const slotEnd = new Date(slotInfo.end);

  console.log("SLot: Start: ", slotStart.toISOString()," End:", slotEnd.toISOString());

  const {user,isLoggedIn} = useSelector((state)=>state.auth);
  console.log(user);
  // add availability
  // useEffect(()=>{
  //   if(isLoggedIn){
  //     console.log("Adding Availability");



  //   }
  // })

  const [availability,setAvailability] = useState({
    email:user.email,
    start:"",
    end:""
  })
  const handleAddAvailability = async()=>{
      
    try{
      const response = await axios.post("http://localhost:4545/users/availability",availabilityData);
    }
    catch(error){ 
      console.log("ERROR: ",error);
    }
  }
  

//   -----------------------------------------------------
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
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
                // aria-hidden="true"
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

            <ul>
              <strong>Start: </strong>
              <strong>End: </strong>

              <strong>Set start and end time</strong>
              <p>start: <span>date selector</span></p>
            </ul>
            {slotStart.toISOString()}  {slotEnd.toISOString()}
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
